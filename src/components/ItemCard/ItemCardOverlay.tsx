"use client";

import { Checkbox, Flex, Paper, Text } from "@mantine/core";
import { ColumnId, Item } from "types/board.types";
import { memo } from "react";
import classes from "./ItemCard.module.css";
import { RiDraggable } from "@remixicon/react";
import { ITEM_STATUS } from "constants/board.constants";

type ItemCardOverlayProps = {
    column: ColumnId;
    item: Item;
    isTrashing: boolean;
};

export const ItemCardOverlay = memo(
    ({ column, item, isTrashing }: ItemCardOverlayProps) => {
        const isNote = column === "NOTE";
        const isCompleted = item.status === ITEM_STATUS.COMPLETED;

        return (
            <Paper
                p="md"
                radius="sm"
                withBorder
                bg={isCompleted ? "themeColor.0" : undefined}
                bd={isTrashing ? "2px solid red.6" : undefined}
                opacity={isCompleted ? 0.9 : 1}
                style={{
                    transform: isTrashing
                        ? "scale(0.96) rotate(-2deg)"
                        : undefined,
                }}
            >
                <Flex
                    justify="space-between"
                    align="center"
                    wrap="nowrap"
                    gap="xl"
                    mih="32"
                    opacity={isCompleted ? 0.7 : 1}
                >
                    <Flex
                        justify="flex-start"
                        align="center"
                        wrap="nowrap"
                        gap="sm"
                        mih="32"
                    >
                        {!isNote && (
                            <Checkbox checked={isCompleted} readOnly></Checkbox>
                        )}
                        <Text
                            className={classes.itemContent}
                            dangerouslySetInnerHTML={{
                                __html: item.content,
                            }}
                            lineClamp={1}
                            td={isCompleted ? "line-through" : "none"}
                        />
                    </Flex>

                    <RiDraggable
                        style={{
                            cursor: "grab",
                            float: "right",
                            outline: "none",
                            flexShrink: 0,
                        }}
                    />
                </Flex>
            </Paper>
        );
    },
);
