"use client";

import { useState } from "react";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import { SimpleGrid } from "@mantine/core";
import { TaskSection } from "@/components/TaskSection";
import { Section, Task } from "types/tasks";
import { TaskCard } from "./TaskCard";

export const TaskContainer = () => {
    const sections: Section[] = [
        { id: "PRIORITY", title: "Priority" },
        { id: "IN_PROGRESS", title: "In Progress" },
        { id: "DONE", title: "Done" },
    ];

    const initialTasks: Task[] = [
        {
            id: "1",
            status: "PRIORITY",
            content: "This is task 1",
        },
        {
            id: "10",
            status: "PRIORITY",
            content: "This is task 20",
        },
        {
            id: "2",
            status: "IN_PROGRESS",
            content: "This is task 2",
        },
        {
            id: "3",
            status: "DONE",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
    ];

    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [activeId, setActiveId] = useState<string | null>(null);

    const activeTask = tasks.find((task) => task.id === activeId);

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const taskId = active.id as string;

        setActiveId(taskId);
    }

    function handleDragEnd(event: DragEndEvent) {
        setActiveId(null);
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id as string;
        const newStatus = over.id as Task["status"];

        setTasks(() =>
            tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    }

    return (
        <SimpleGrid h="100%" cols={{ base: 1, sm: 2, md: 3 }}>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <DragOverlay>
                    {activeTask ? <TaskCard task={activeTask} /> : null}
                </DragOverlay>

                {sections.map((section) => (
                    <TaskSection
                        key={section.id}
                        section={section}
                        tasks={tasks.filter(
                            (task) => task.status === section.id
                        )}
                    ></TaskSection>
                ))}
            </DndContext>
        </SimpleGrid>
    );
};
