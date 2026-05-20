"use client";

import { Box, Checkbox, Flex, Paper, Text } from "@mantine/core";
import { Task } from "types/tasks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useState } from "react";
import TiptapEditor from "../TiptapEditor/TiptapEditor";
import classes from "./TaskCard.module.css";
import { RiDraggable } from "@remixicon/react";

type TaskCardProps = {
    task: Task;
    injectStyle?: React.CSSProperties;
    handleContentChange?: (task: Task, content: string) => void;
};

export const TaskCard = memo(
    ({ task, injectStyle, handleContentChange }: TaskCardProps) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
        } = useSortable({
            id: task.id,
        });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : 1,
            ...injectStyle,
        };

        const [isEditing, setIsEditing] = useState<boolean>(false);

        return (
            <Paper
                ref={setNodeRef}
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
                        {...attributes}
                        {...listeners}
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
