"use client";

import { Paper, Text } from "@mantine/core";
import { useDraggable } from "@dnd-kit/core";
import { Task } from "types/tasks";

type TaskCardProps = {
    task: Task;
};

export const TaskCard = ({ task }: TaskCardProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
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
