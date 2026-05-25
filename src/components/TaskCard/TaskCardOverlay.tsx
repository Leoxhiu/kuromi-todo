"use client";

import { Checkbox, Flex, Paper, Text } from "@mantine/core";
import { Task } from "types/tasks";
import { memo } from "react";
import classes from "./TaskCard.module.css";
import { RiDraggable } from "@remixicon/react";

type TaskCardOverlayProps = {
    task: Task;
};

export const TaskCardOverlay = memo(({ task }: TaskCardOverlayProps) => {
    return (
        <Paper p="md" radius="sm" withBorder>
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
                    <Checkbox></Checkbox>
                    <Text
                        className={classes.taskContent}
                        dangerouslySetInnerHTML={{
                            __html: task.content,
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
});
