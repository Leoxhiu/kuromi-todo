"use client";

import {
    Button,
    Group,
    Paper,
    ScrollAreaAutosize,
    Stack,
    Title,
} from "@mantine/core";
import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { Section as SectionType, Task } from "types/tasks";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { memo } from "react";

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
        const { setNodeRef } = useDroppable({
            id: section.id,
        });

        return (
            <Paper
                ref={setNodeRef}
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
                            <Button onClick={() => handleAddTask(section.id)}>
                                Add
                            </Button>
                        )}
                    </Group>

                    <ScrollAreaAutosize
                        mah={750}
                        type="scroll"
                        scrollbarSize={8}
                    >
                        <SortableContext
                            items={tasks.map((task) => task.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <Stack gap="xs">
                                {tasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        handleContentChange={
                                            handleContentChange
                                        }
                                    ></TaskCard>
                                ))}
                            </Stack>
                        </SortableContext>
                    </ScrollAreaAutosize>
                </Stack>
            </Paper>
        );
    },
);
