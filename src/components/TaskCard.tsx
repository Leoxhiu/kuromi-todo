"use client";

import { Paper, Text } from "@mantine/core";
import { Task } from "types/tasks";
import { useSortable } from "@dnd-kit/sortable";

type TaskCardProps = {
    task: Task;
};

export const TaskCard = ({ task }: TaskCardProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: task.id,
        });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        transition,
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
