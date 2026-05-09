"use client";

import { Paper, Text } from "@mantine/core";
import { Task } from "types/tasks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskCardProps = {
    task: Task;
    injectStyle?: React.CSSProperties;
};

export const TaskCard = ({
    task,
    injectStyle,
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

    return (
        <Paper
            {...attributes}
            {...listeners}
            ref={setNodeRef}
            p="md"
            radius="sm"
            withBorder
            style={style}
        >
            <Text>{task.content}</Text>
        </Paper>
    );
};
