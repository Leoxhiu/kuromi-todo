"use client";

import { useState, useEffect, useCallback } from "react";
import {
    DragDropProvider,
    DragOverlay,
    DragStartEvent,
    DragOverEvent,
} from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { Grid, Stack } from "@mantine/core";
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
    const activeTask = activeId ? findTask(activeId) : null;

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

    function findTask(taskId: string): Task | undefined {
        const columnId = findColumn(board, taskId);

        if (!columnId) return;

        return board[columnId].find((task) => task.id === taskId);
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

    // TODO: Create a DnD Note section, Change Done section to On Hold section (Rename only, keep Done status)
    //TODO: Add Droppable Trash section to delete tasks from list
    //TODO: Add logic to the checkbox to mark tasks as Done, strikethrough and move down to the In Progress section
    //TODO: Add TextStyleKit extension to Tiptap editor

    return (
        <Grid h="100%" grow>
            {!mounted ? null : (
                <DragDropProvider
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                >
                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                        <TaskColumn
                            id={COLUMN_MAP.PRIORITY.id}
                            label={COLUMN_MAP.PRIORITY.label}
                            tasks={board.PRIORITY}
                            handleAddTask={handleAddTask}
                            handleContentChange={handleContentChange}
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                        <TaskColumn
                            id={COLUMN_MAP.IN_PROGRESS.id}
                            label={COLUMN_MAP.IN_PROGRESS.label}
                            tasks={board.IN_PROGRESS}
                            handleAddTask={handleAddTask}
                            handleContentChange={handleContentChange}
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 12, lg: 4 }}>
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
                    </Grid.Col>

                    <DragOverlay>
                        {activeTask ? (
                            <TaskCardOverlay task={activeTask} />
                        ) : null}
                    </DragOverlay>
                </DragDropProvider>
            )}
        </Grid>
    );
};

export default TaskBoard;
