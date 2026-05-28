"use client";

import {
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
        const isNote = id === "NOTE";
        const type = isNote ? DND_TYPES.NOTE_COLUMN : DND_TYPES.TASK_COLUMN;
        const accept = isNote ? DND_TYPES.NOTE_ITEM : DND_TYPES.TASK_ITEM;

        const { ref } = useDroppable({
            id,
            type,
            accept,
        });

        return (
            <Paper
                ref={ref}
                h="100%"
                mih={0}
                p="md"
                bg="themeColor.1"
                shadow="xs"
                withBorder
            >
                <Stack h="100%" miw={0} mih={0} gap="sm">
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
                        flex={1}
                        type="scroll"
                        scrollbarSize={8}
                    >
                        <Stack gap="sm">
                            {tasks.map((task, index) => (
                                <TaskCard
                                    key={task.id}
                                    isNote={isNote}
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
