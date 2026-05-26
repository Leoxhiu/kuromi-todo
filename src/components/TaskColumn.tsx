"use client";

import {
    Box,
    Grid,
    Group,
    Paper,
    ScrollAreaAutosize,
    Stack,
    Title,
} from "@mantine/core";
import { TaskCard } from "./TaskCard/TaskCard";
import { useDroppable } from "@dnd-kit/react";
import { ColumnId, Task } from "types/board.types";
import { memo } from "react";
import { RiAddLine } from "@remixicon/react";
import { NewTaskButton } from "./NewTaskButton";
import { DND_TYPES } from "constants/board.constants";

interface TaskColumnProps {
    id: ColumnId;
    label: string;
    tasks: Task[];
    handleAddTask: (columnId: ColumnId) => void;
    handleContentChange: (task: Task, content: string) => void;
}

export const TaskColumn = memo(
    ({
        id,
        label,
        tasks,
        handleAddTask,
        handleContentChange,
    }: TaskColumnProps) => {
        const { ref } = useDroppable({
            id,
            type: DND_TYPES.TASK_COLUMN,
            accept: DND_TYPES.TASK_ITEM,
        });

        return (
            <Paper
                ref={ref}
                h="100%"
                p="md"
                bg="violet.0"
                shadow="xs"
                withBorder
            >
                <Stack h="100%" gap="sm">
                    <Grid align="center">
                        <Grid.Col span={4} />

                        <Grid.Col span={4}>
                            <Title ta="center" order={4} fw="bold">
                                {label}
                            </Title>
                        </Grid.Col>

                        <Grid.Col span={4}>
                            <Group justify="flex-end">
                                {(id === "IN_PROGRESS" || id === "NOTE") && (
                                    <NewTaskButton
                                        onClick={() => handleAddTask(id)}
                                    >
                                        <RiAddLine />
                                    </NewTaskButton>
                                )}
                            </Group>
                        </Grid.Col>
                    </Grid>

                    <ScrollAreaAutosize
                        h="100%"
                        mah={745}
                        type="scroll"
                        scrollbarSize={8}
                    >
                        <Stack gap="sm">
                            {tasks.map((task, index) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    index={index}
                                    handleContentChange={handleContentChange}
                                ></TaskCard>
                            ))}
                        </Stack>
                    </ScrollAreaAutosize>
                </Stack>
            </Paper>
        );
    },
);
