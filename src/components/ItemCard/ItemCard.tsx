"use client";

import { Box, Checkbox, Flex, Paper, Text } from "@mantine/core";
import { Item } from "types/board.types";
import { useSortable } from "@dnd-kit/react/sortable";
import { memo, useState } from "react";
import TiptapEditor from "../TiptapEditor/TiptapEditor";
import classes from "./ItemCard.module.css";
import { RiDraggable } from "@remixicon/react";
import { DND_TYPES } from "constants/board.constants";

interface ItemCardProps {
    isNote: boolean;
    isTrashing: boolean;
    item: Item;
    index: number;
    handleContentChange?: (item: Item, content: string) => void;
}

export const ItemCard = memo(
    ({
        isNote,
        isTrashing,
        item,
        index,
        handleContentChange,
    }: ItemCardProps) => {
        const itemType = isNote ? DND_TYPES.NOTE_ITEM : DND_TYPES.TASK_ITEM;

        const { ref, handleRef, isDragSource } = useSortable({
            id: item.id,
            index: index,
            type: itemType,
            accept: itemType,
        });

        const style = {
            opacity: isDragSource && isTrashing ? 0 : isDragSource ? 0.5 : 1,
        };

        const [isEditing, setIsEditing] = useState<boolean>(false);

        return (
            <Paper
                ref={ref}
                p="md"
                radius="sm"
                withBorder
                style={style}
                onDoubleClick={() => setIsEditing(true)}
            >
                <Flex
                    justify="space-between"
                    align="center"
                    wrap="nowrap"
                    gap="xl"
                    mih="32"
                >
                    <Flex
                        justify="flex-start"
                        align="center"
                        wrap="nowrap"
                        gap="sm"
                        mih="32"
                    >
                        {isNote ? null : <Checkbox></Checkbox>}
                        <Text
                            className={classes.itemContent}
                            dangerouslySetInnerHTML={{
                                __html: isEditing ? "" : item.content,
                            }}
                            lineClamp={1}
                            style={{
                                visibility: isEditing ? "hidden" : "visible",
                            }}
                        />
                    </Flex>

                    <RiDraggable
                        ref={handleRef}
                        style={{
                            cursor: "grab",
                            float: "right",
                            outline: "none",
                            flexShrink: 0,
                        }}
                    />
                </Flex>

                {isEditing ? (
                    <TiptapEditor
                        content={item.content}
                        handleContentChange={(content) =>
                            handleContentChange?.(item, content)
                        }
                        setIsEditing={setIsEditing}
                    />
                ) : (
                    <Box></Box>
                )}
            </Paper>
        );
    },
);
