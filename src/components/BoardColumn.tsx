"use client";

import {
    Grid,
    Group,
    Paper,
    ScrollAreaAutosize,
    Stack,
    Title,
} from "@mantine/core";
import { ItemCard } from "./ItemCard/ItemCard";
import { useDroppable } from "@dnd-kit/react";
import { ColumnId, Item } from "types/board.types";
import { memo } from "react";
import { RiAddLine } from "@remixicon/react";
import { NewItemButton } from "./NewItemButton";
import { DND_TYPES } from "constants/board.constants";

interface BoardColumnProps {
    id: ColumnId;
    label: string;
    items: Item[];
    isTrashing: boolean;
    handleAddItem: (columnId: ColumnId) => void;
    handleContentChange: (item: Item, content: string) => void;
    handleStatusChange: (item: Item, status: boolean) => void;
}

export const BoardColumn = memo(
    ({
        id,
        label,
        items,
        isTrashing,
        handleAddItem,
        handleContentChange,
        handleStatusChange,
    }: BoardColumnProps) => {
        const isNote = id === "NOTE";
        const type = isNote ? DND_TYPES.NOTE_COLUMN : DND_TYPES.TASK_COLUMN;
        const accept = isNote ? DND_TYPES.NOTE_ITEM : DND_TYPES.TASK_ITEM;

        const { ref } = useDroppable({
            id,
            type,
            accept,
        });

        return (
            <Paper
                ref={ref}
                h="100%"
                mih={0}
                p="md"
                bg="themeColor.1"
                shadow="xs"
                withBorder
            >
                <Stack h="100%" miw={0} mih={0} gap="sm">
                    <Grid align="center">
                        <Grid.Col span={4} />

                        <Grid.Col span={4}>
                            <Title ta="center" order={4} fw="bold">
                                {label}
                            </Title>
                        </Grid.Col>

                        <Grid.Col span={4}>
                            <Group justify="flex-end">
                                {(id === "IN_PROGRESS" || id === "NOTE") && (
                                    <NewItemButton
                                        onClick={() => handleAddItem(id)}
                                    >
                                        <RiAddLine />
                                    </NewItemButton>
                                )}
                            </Group>
                        </Grid.Col>
                    </Grid>

                    <ScrollAreaAutosize
                        flex={1}
                        type="scroll"
                        scrollbarSize={8}
                    >
                        <Stack gap="sm">
                            {items.map((item, index) => (
                                <ItemCard
                                    key={item.id}
                                    isNote={isNote}
                                    isTrashing={isTrashing}
                                    item={item}
                                    index={index}
                                    handleContentChange={handleContentChange}
                                    handleStatusChange={handleStatusChange}
                                ></ItemCard>
                            ))}
                        </Stack>
                    </ScrollAreaAutosize>
                </Stack>
            </Paper>
        );
    },
);
