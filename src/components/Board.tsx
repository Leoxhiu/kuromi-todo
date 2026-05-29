"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
    DragDropProvider,
    DragOverlay,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { Affix, Box, Portal, SimpleGrid, Stack } from "@mantine/core";
import { BoardColumn } from "components/BoardColumn";
import { type Board, ColumnId, Item } from "types/board.types";
import { ItemCardOverlay } from "./ItemCard/ItemCardOverlay";
import { TrashColumn } from "./TrashColumn";
import { COLUMN_IDS, ITEM_STATUS } from "constants/board.constants";

export const BOARD_COLUMNS: { id: ColumnId; label: string }[] = [
    { id: COLUMN_IDS.PRIORITY, label: "Priority" },
    { id: COLUMN_IDS.IN_PROGRESS, label: "In Progress" },
    { id: COLUMN_IDS.ON_HOLD, label: "On Hold" },
    { id: COLUMN_IDS.NOTE, label: "Notes" },
    { id: COLUMN_IDS.TRASH, label: " Trash" },
] as const;

export const INITIAL_BOARD: Board = {
    PRIORITY: [],
    IN_PROGRESS: [],
    ON_HOLD: [],
    NOTE: [],
    TRASH: [],
};

export const COLUMN_MAP = Object.fromEntries(
    BOARD_COLUMNS.map((column) => [column.id, column]),
) as Record<ColumnId, { id: ColumnId; label: string }>;

const Board = () => {
    const [board, setBoard] = useState<Board>(INITIAL_BOARD);

    const [mounted, setMounted] = useState<boolean>(false);

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isTrashing, setIsTrashing] = useState<boolean>(false);

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
            content:
                columnId === COLUMN_MAP.IN_PROGRESS.id
                    ? "New task"
                    : "New note",
            status: ITEM_STATUS.INCOMPLETE,
        };

        setBoard((prevBoard) => ({
            ...prevBoard,
            [columnId]: [newItem, ...prevBoard[columnId]],
        }));
    };

    const handleContentChange = useCallback(
        (targetItem: Item, newContent: string) => {
            setBoard((prevBoard) => {
                const columnId = findColumn(prevBoard, targetItem.id);

                if (!columnId) return prevBoard;

                return {
                    ...prevBoard,
                    [columnId]: prevBoard[columnId].map((item) =>
                        item.id === targetItem.id
                            ? { ...item, content: newContent }
                            : item,
                    ),
                };
            });
        },
        [],
    );

    const handleStatusChange = useCallback(
        (targetItem: Item, newStatus: boolean) => {
            setBoard((prevBoard) => {
                const columnId = findColumn(prevBoard, targetItem.id);

                if (!columnId) return prevBoard;

                return {
                    ...prevBoard,
                    [columnId]: prevBoard[columnId].map((item) =>
                        item.id === targetItem.id
                            ? {
                                  ...item,
                                  status: newStatus
                                      ? ITEM_STATUS.COMPLETED
                                      : ITEM_STATUS.INCOMPLETE,
                              }
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
        setIsDragging(true);
        setIsTrashing(false);
    }

    function handleDragOver(event: DragOverEvent) {
        const { target } = event.operation;

        if (!target) {
            setIsTrashing(false);
            return;
        }

        if (target.id === COLUMN_MAP.TRASH.id) {
            setIsTrashing(true);
            return;
        }
        setIsTrashing(false);
        setBoard((boards) => move(boards, event));
    }

    function handleDragEnd(event: DragEndEvent) {
        setIsDragging(false);

        const { source, target } = event.operation;
        if (!source || !target) return;

        if (target.id === COLUMN_MAP.TRASH.id) {
            setIsTrashing(false);
            // Remove the item from column
            setBoard((prevBoard) => {
                const columnId = findColumn(prevBoard, source.id as string);

                if (!columnId) return prevBoard;

                return {
                    ...prevBoard,
                    [columnId]: prevBoard[columnId].filter(
                        (item) => item.id !== source.id,
                    ),
                };
            });
        }
    }

    //TODO: Add TextStyleKit extension to Tiptap editor

    return (
        <Box flex={1} mih={0}>
            <DragDropProvider
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <Portal>
                    <Affix position={{ top: 24, right: 24 }} zIndex={200}>
                        <TrashColumn
                            id={COLUMN_MAP.TRASH.id}
                            isDragging={isDragging}
                            isTrashing={isTrashing}
                        ></TrashColumn>
                    </Affix>
                </Portal>

                <SimpleGrid
                    cols={{ base: 1, sm: 2, lg: 3 }}
                    spacing="sm"
                    h="100%"
                >
                    {!mounted ? null : (
                        <>
                            <Box flex={1} mih={{ base: 400, lg: 0 }} w="100%">
                                <BoardColumn
                                    id={COLUMN_MAP.PRIORITY.id}
                                    label={COLUMN_MAP.PRIORITY.label}
                                    items={board.PRIORITY}
                                    isTrashing={isTrashing}
                                    handleAddItem={handleAddItem}
                                    handleContentChange={handleContentChange}
                                    handleStatusChange={handleStatusChange}
                                />
                            </Box>

                            <Box flex={1} mih={{ base: 400, lg: 0 }} w="100%">
                                <BoardColumn
                                    id={COLUMN_MAP.IN_PROGRESS.id}
                                    label={COLUMN_MAP.IN_PROGRESS.label}
                                    items={board.IN_PROGRESS}
                                    isTrashing={isTrashing}
                                    handleAddItem={handleAddItem}
                                    handleContentChange={handleContentChange}
                                    handleStatusChange={handleStatusChange}
                                />
                            </Box>

                            <Box flex={1} mih={0} w="100%">
                                <Stack h={{ base: 800, lg: "100%" }} gap="md">
                                    <BoardColumn
                                        id={COLUMN_MAP.ON_HOLD.id}
                                        label={COLUMN_MAP.ON_HOLD.label}
                                        items={board.ON_HOLD}
                                        isTrashing={isTrashing}
                                        handleAddItem={handleAddItem}
                                        handleContentChange={
                                            handleContentChange
                                        }
                                        handleStatusChange={handleStatusChange}
                                    />

                                    <BoardColumn
                                        id={COLUMN_MAP.NOTE.id}
                                        label={COLUMN_MAP.NOTE.label}
                                        items={board.NOTE}
                                        isTrashing={isTrashing}
                                        handleAddItem={handleAddItem}
                                        handleContentChange={
                                            handleContentChange
                                        }
                                        handleStatusChange={handleStatusChange}
                                    />
                                </Stack>
                            </Box>
                        </>
                    )}
                </SimpleGrid>

                <DragOverlay>
                    {activeInfo.column && activeInfo.item ? (
                        <ItemCardOverlay
                            column={activeInfo.column}
                            item={activeInfo.item}
                            isTrashing={isTrashing}
                        />
                    ) : null}
                </DragOverlay>
            </DragDropProvider>
        </Box>
    );
};

export default Board;
