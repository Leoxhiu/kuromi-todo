"use client";

import { Box, Checkbox, Flex, Paper, Text } from "@mantine/core";
import { Item } from "types/board.types";
import { useSortable } from "@dnd-kit/react/sortable";
import { memo, useState } from "react";
import TiptapEditor from "../TiptapEditor/TiptapEditor";
import classes from "./ItemCard.module.css";
import { RiDraggable } from "@remixicon/react";
import { DND_TYPES, ITEM_STATUS } from "constants/board.constants";

interface ItemCardProps {
    isNote: boolean;
    isTrashing: boolean;
    item: Item;
    index: number;
    handleContentChange: (item: Item, content: string) => void;
    handleStatusChange: (item: Item, status: boolean) => void;
}

export const ItemCard = memo(
    ({
        isNote,
        isTrashing,
        item,
        index,
        handleContentChange,
        handleStatusChange,
    }: ItemCardProps) => {
        const itemType = isNote ? DND_TYPES.NOTE_ITEM : DND_TYPES.TASK_ITEM;
        const [isEditing, setIsEditing] = useState<boolean>(false);
        const isCompleted = item.status === ITEM_STATUS.COMPLETED;

        const { ref, handleRef, isDragSource } = useSortable({
            id: item.id,
            index: index,
            type: itemType,
            accept: itemType,
        });

        return (
            <Paper
                ref={ref}
                p="md"
                radius="sm"
                withBorder
                bg={isCompleted ? "themeColor.0" : undefined}
                opacity={
                    isDragSource && isTrashing
                        ? 0
                        : isDragSource
                          ? 0.5
                          : isCompleted
                            ? 0.9
                            : 1
                }
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
                        opacity={isCompleted ? 0.7 : 1}
                    >
                        {isNote ? null : (
                            <Checkbox
                                checked={isCompleted}
                                onChange={(event) =>
                                    handleStatusChange(
                                        item,
                                        event.currentTarget.checked,
                                    )
                                }
                            ></Checkbox>
                        )}
                        <Text
                            className={classes.itemContent}
                            dangerouslySetInnerHTML={{
                                __html: isEditing ? "" : item.content,
                            }}
                            lineClamp={1}
                            td={isCompleted ? "line-through" : "none"}
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
                            handleContentChange(item, content)
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
