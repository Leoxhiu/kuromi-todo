"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
    DragDropProvider,
    DragOverlay,
    DragStartEvent,
    DragOverEvent,
} from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { Box, Flex, Stack } from "@mantine/core";
import { TaskColumn } from "components/TaskColumn";
import { Board, ColumnId, Task } from "types/board.types";
import { TaskCardOverlay } from "./TaskCard/TaskCardOverlay";

export const BOARD_COLUMNS: { id: ColumnId; label: string }[] = [
    { id: "PRIORITY", label: "Priority" },
    { id: "IN_PROGRESS", label: "In Progress" },
    { id: "ON_HOLD", label: "On Hold" },
    { id: "NOTE", label: "Notes" },
] as const;

export const INITIAL_BOARD: Board = {
    PRIORITY: [],
    IN_PROGRESS: [],
    ON_HOLD: [],
    NOTE: [],
};

export const COLUMN_MAP = Object.fromEntries(
    BOARD_COLUMNS.map((column) => [column.id, column]),
) as Record<ColumnId, { id: ColumnId; label: string }>;

const TaskBoard = () => {
    const [board, setBoard] = useState<Board>(INITIAL_BOARD);

    const [mounted, setMounted] = useState<boolean>(false);

    const [activeId, setActiveId] = useState<string | null>(null);

    const activeInfo = useMemo(() => {
        if (!activeId)
            return {
                column: undefined as ColumnId | undefined,
                task: undefined as Task | undefined,
            };

        for (const col of Object.keys(board) as ColumnId[]) {
            const t = board[col].find((task) => task.id === activeId);
            if (t) return { column: col, task: t };
        }

        return {
            column: undefined as ColumnId | undefined,
            task: undefined as Task | undefined,
        };
    }, [board, activeId]);

    useEffect(() => {
        const savedBoard = localStorage.getItem("board");

        if (savedBoard) {
            setBoard(JSON.parse(savedBoard));
        }

        setMounted(true);
    }, []);

    useEffect(() => {
        localStorage.setItem("board", JSON.stringify(board));
    }, [board]);

    function findColumn(board: Board, taskId: string): ColumnId | undefined {
        return (Object.keys(board) as ColumnId[]).find((columnId) =>
            board[columnId].some((task) => task.id === taskId),
        );
    }

    const handleAddTask = (columnId: ColumnId) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            content: columnId === "IN_PROGRESS" ? "New task" : "New note",
        };

        setBoard((prevBoard) => ({
            ...prevBoard,
            [columnId]: [newTask, ...prevBoard[columnId]],
        }));
    };

    const handleContentChange = useCallback(
        (editedTask: Task, newContent: string) => {
            setBoard((prevBoard) => {
                const columnId = findColumn(prevBoard, editedTask.id);

                if (!columnId) return prevBoard;

                return {
                    ...prevBoard,
                    [columnId]: prevBoard[columnId].map((task) =>
                        task.id === editedTask.id
                            ? { ...task, content: newContent }
                            : task,
                    ),
                };
            });
        },
        [],
    );

    function handleDragStart(event: DragStartEvent) {
        const { id } = event.operation.source!;
        const taskId = id as string;

        setActiveId(taskId);
    }

    function handleDragOver(event: DragOverEvent) {
        setBoard((boards) => move(boards, event));
    }

    //TODO: Add Droppable Trash section to delete tasks from list
    //TODO: Add logic to the checkbox to mark tasks as Done (status), strikethrough and move down to the In Progress section
    //TODO: Add TextStyleKit extension to Tiptap editor

    return (
        <DragDropProvider
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
        >
            <Flex h="100%" w="100%" gap="sm">
                {!mounted ? null : (
                    <>
                        <Box flex={1}>
                            <TaskColumn
                                id={COLUMN_MAP.PRIORITY.id}
                                label={COLUMN_MAP.PRIORITY.label}
                                tasks={board.PRIORITY}
                                handleAddTask={handleAddTask}
                                handleContentChange={handleContentChange}
                            />
                        </Box>

                        <Box flex={1}>
                            <TaskColumn
                                id={COLUMN_MAP.IN_PROGRESS.id}
                                label={COLUMN_MAP.IN_PROGRESS.label}
                                tasks={board.IN_PROGRESS}
                                handleAddTask={handleAddTask}
                                handleContentChange={handleContentChange}
                            />
                        </Box>

                        <Box flex={1}>
                            <Stack h="100%" gap="md">
                                <TaskColumn
                                    id={COLUMN_MAP.ON_HOLD.id}
                                    label={COLUMN_MAP.ON_HOLD.label}
                                    tasks={board.ON_HOLD}
                                    handleAddTask={handleAddTask}
                                    handleContentChange={handleContentChange}
                                />

                                <TaskColumn
                                    id={COLUMN_MAP.NOTE.id}
                                    label={COLUMN_MAP.NOTE.label}
                                    tasks={board.NOTE}
                                    handleAddTask={handleAddTask}
                                    handleContentChange={handleContentChange}
                                />
                            </Stack>
                        </Box>
                    </>
                )}
            </Flex>
            <DragOverlay>
                {activeInfo.column && activeInfo.task ? (
                    <TaskCardOverlay
                        column={activeInfo.column}
                        task={activeInfo.task}
                    />
                ) : null}
            </DragOverlay>
        </DragDropProvider>
    );
};

export default TaskBoard;
