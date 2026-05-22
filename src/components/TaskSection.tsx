"use client";

import { Group, Paper, ScrollAreaAutosize, Stack, Title } from "@mantine/core";
import { TaskCard } from "./TaskCard/TaskCard";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { Section as SectionType, Task } from "types/tasks";
import { memo } from "react";
import { RiAddLine } from "@remixicon/react";
import { NewTaskButton } from "./NewTaskButton";

type TaskSectionProps = {
    section: SectionType;
    tasks: Task[];
    handleAddTask: (sectionId: SectionType["id"]) => void;
    handleContentChange: (task: Task, content: string) => void;
};

export const TaskSection = memo(
    ({
        section,
        tasks,
        handleAddTask,
        handleContentChange,
    }: TaskSectionProps) => {
        const { isDropTarget, ref } = useDroppable({
            id: section.id,
            type: section.id,
            accept: "task",
            collisionPriority: CollisionPriority.Low,
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
                    <Group justify="space-between">
                        <Title order={4} fw="bold">
                            {section.title}
                        </Title>
                        {section.id === "IN_PROGRESS" && (
                            <NewTaskButton
                                onClick={() => handleAddTask(section.id)}
                            >
                                <RiAddLine />
                            </NewTaskButton>
                        )}
                    </Group>

                    <ScrollAreaAutosize
                        h="100%"
                        mah={745}
                        type="scroll"
                        scrollbarSize={8}
                    >
                        <Stack gap="xs">
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
