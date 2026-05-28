"use client";

import { Checkbox, Flex, Paper, Text } from "@mantine/core";
import { ColumnId, Item } from "types/board.types";
import { memo } from "react";
import classes from "./ItemCard.module.css";
import { RiDraggable } from "@remixicon/react";

type ItemCardOverlayProps = {
    column: ColumnId;
    item: Item;
    isTrashing: boolean;
};

export const ItemCardOverlay = memo(
    ({ column, item, isTrashing }: ItemCardOverlayProps) => {
        const isNote = column === "NOTE";

        return (
            <Paper
                p="md"
                radius="sm"
                withBorder
                bd={isTrashing ? "2px solid red.6" : undefined}
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
                >
                    <Flex
                        justify="flex-start"
                        align="center"
                        wrap="nowrap"
                        gap="sm"
                        mih="32"
                    >
                        {!isNote && <Checkbox></Checkbox>}
                        <Text
                            className={classes.itemContent}
                            dangerouslySetInnerHTML={{
                                __html: item.content,
                            }}
                            lineClamp={1}
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
