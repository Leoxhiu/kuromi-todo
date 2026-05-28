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
import { BoardColumn } from "components/BoardColumn";
import { type Board, ColumnId, Item } from "types/board.types";
import { ItemCardOverlay } from "./ItemCard/ItemCardOverlay";

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

const Board = () => {
    const [board, setBoard] = useState<Board>(INITIAL_BOARD);

    const [mounted, setMounted] = useState<boolean>(false);

    const [activeId, setActiveId] = useState<string | null>(null);

    const activeInfo = useMemo(() => {
        if (!activeId)
            return {
                column: undefined as ColumnId | undefined,
                item: undefined as Item | undefined,
            };

        for (const col of Object.keys(board) as ColumnId[]) {
            const t = board[col].find((item) => item.id === activeId);
            if (t) return { column: col, item: t };
        }

        return {
            column: undefined as ColumnId | undefined,
            item: undefined as Item | undefined,
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

    function findColumn(board: Board, itemId: string): ColumnId | undefined {
        return (Object.keys(board) as ColumnId[]).find((columnId) =>
            board[columnId].some((item) => item.id === itemId),
        );
    }

    const handleAddItem = (columnId: ColumnId) => {
        const newItem: Item = {
            id: crypto.randomUUID(),
            content: columnId === "IN_PROGRESS" ? "New task" : "New note",
        };

        setBoard((prevBoard) => ({
            ...prevBoard,
            [columnId]: [newItem, ...prevBoard[columnId]],
        }));
    };

    const handleContentChange = useCallback(
        (editedItem: Item, newContent: string) => {
            setBoard((prevBoard) => {
                const columnId = findColumn(prevBoard, editedItem.id);

                if (!columnId) return prevBoard;

                return {
                    ...prevBoard,
                    [columnId]: prevBoard[columnId].map((item) =>
                        item.id === editedItem.id
                            ? { ...item, content: newContent }
                            : item,
                    ),
                };
            });
        },
        [],
    );

    function handleDragStart(event: DragStartEvent) {
        const { id } = event.operation.source!;
        const itemId = id as string;

        setActiveId(itemId);
    }

    function handleDragOver(event: DragOverEvent) {
        setBoard((boards) => move(boards, event));
    }

    //TODO: Add Droppable Trash section to delete items from list
    //TODO: Add logic to the checkbox to mark items as Completed (status), strikethrough and move down to the In Progress section
    //TODO: Add TextStyleKit extension to Tiptap editor

    return (
        <Box flex={1} mih={0}>
            <DragDropProvider
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
            >
                <Flex h="100%" w="100%" gap="sm">
                    {!mounted ? null : (
                        <>
                            <Box flex={1}>
                                <BoardColumn
                                    id={COLUMN_MAP.PRIORITY.id}
                                    label={COLUMN_MAP.PRIORITY.label}
                                    items={board.PRIORITY}
                                    handleAddItem={handleAddItem}
                                    handleContentChange={handleContentChange}
                                />
                            </Box>

                            <Box flex={1}>
                                <BoardColumn
                                    id={COLUMN_MAP.IN_PROGRESS.id}
                                    label={COLUMN_MAP.IN_PROGRESS.label}
                                    items={board.IN_PROGRESS}
                                    handleAddItem={handleAddItem}
                                    handleContentChange={handleContentChange}
                                />
                            </Box>

                            <Box flex={1}>
                                <Stack h="100%" gap="md">
                                    <BoardColumn
                                        id={COLUMN_MAP.ON_HOLD.id}
                                        label={COLUMN_MAP.ON_HOLD.label}
                                        items={board.ON_HOLD}
                                        handleAddItem={handleAddItem}
                                        handleContentChange={
                                            handleContentChange
                                        }
                                    />

                                    <BoardColumn
                                        id={COLUMN_MAP.NOTE.id}
                                        label={COLUMN_MAP.NOTE.label}
                                        items={board.NOTE}
                                        handleAddItem={handleAddItem}
                                        handleContentChange={
                                            handleContentChange
                                        }
                                    />
                                </Stack>
                            </Box>
                        </>
                    )}
                </Flex>
                <DragOverlay>
                    {activeInfo.column && activeInfo.item ? (
                        <ItemCardOverlay
                            column={activeInfo.column}
                            item={activeInfo.item}
                        />
                    ) : null}
                </DragOverlay>
            </DragDropProvider>
        </Box>
    );
};

export default Board;
