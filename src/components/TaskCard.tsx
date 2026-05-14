"use client";

import { Paper, Text } from "@mantine/core";
import { Task } from "types/tasks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useState } from "react";
import TiptapEditor from "./TiptapEditor";

type TaskCardProps = {
    task: Task;
    injectStyle?: React.CSSProperties;
    handleContentChange?: (task: Task, content: string) => void;
};

export const TaskCard = memo(
    ({
        task,
        injectStyle,
        handleContentChange,
    }: TaskCardProps & { style?: React.CSSProperties }) => {
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
                <span
                    className="material-symbols-outlined"
                    {...attributes}
                    {...listeners}
                    style={{ cursor: "grab", float: "right" }}
                >
                    drag_indicator
                </span>
                {isEditing ? (
                    <TiptapEditor
                        content={task.content}
                        handleContentChange={(content) =>
                            handleContentChange?.(task, content)
                        }
                        setIsEditing={setIsEditing}
                    />
                ) : (
                    <Text
                        dangerouslySetInnerHTML={{ __html: task.content }}
                        lineClamp={3}
                    />
                )}
            </Paper>
        );
    },
);
