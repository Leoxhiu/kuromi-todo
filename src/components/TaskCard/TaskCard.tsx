"use client";

import { Box, Checkbox, Flex, Paper, Text } from "@mantine/core";
import { Task } from "types/tasks";
import { useSortable } from "@dnd-kit/react/sortable";
import { memo, useState } from "react";
import TiptapEditor from "../TiptapEditor/TiptapEditor";
import classes from "./TaskCard.module.css";
import { RiDraggable } from "@remixicon/react";

type TaskCardProps = {
    task: Task;
    index: number;
    injectStyle?: React.CSSProperties;
    handleContentChange?: (task: Task, content: string) => void;
};

export const TaskCard = memo(
    ({ task, index, injectStyle, handleContentChange }: TaskCardProps) => {
        const { ref, isDragging } = useSortable({
            id: task.id,
            index: index,
            type: "task",
            accept: "task",
            group: task.status,
        });

        const style = {
            opacity: isDragging ? 0.5 : 1,
            ...injectStyle,
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
                        <Checkbox></Checkbox>
                        <Text
                            className={classes.taskContent}
                            dangerouslySetInnerHTML={{
                                __html: isEditing ? "" : task.content,
                            }}
                            lineClamp={1}
                            style={{
                                visibility: isEditing ? "hidden" : "visible",
                            }}
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

                {isEditing ? (
                    <TiptapEditor
                        content={task.content}
                        handleContentChange={(content) =>
                            handleContentChange?.(task, content)
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
