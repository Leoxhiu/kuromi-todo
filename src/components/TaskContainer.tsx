"use client";

import { useState, useEffect } from "react";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    pointerWithin,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SimpleGrid } from "@mantine/core";
import { TaskSection } from "@/components/TaskSection";
import { Section, Task } from "types/tasks";
import { TaskCard } from "./TaskCard";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

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

    const [mounted, setMounted] = useState(false);

    const activeTask = tasks.find((task) => task.id === activeId);

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const taskId = active.id as string;

        setActiveId(taskId);
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id as string;
        const overId = over.id as Task["status"];

        // Check if the over ID is a section ID (cross-section move)
        const sectionIds = sections.map((section) => section.id);
        const isDroppedOnSection = sectionIds.includes(overId);

        if (isDroppedOnSection) {
            // Cross-section move
            const newStatus = overId as Task["status"];
            setTasks(() =>
                tasks.map((task) =>
                    task.id === taskId ? { ...task, status: newStatus } : task,
                ),
            );
        } else if (active.id !== over.id) {
            // Within-section reorder
            const oldIndex = tasks.findIndex((task) => task.id === active.id);
            const newIndex = tasks.findIndex((task) => task.id === overId);

            if (oldIndex !== -1 && newIndex !== -1) {
                setTasks((tasks) => arrayMove(tasks, oldIndex, newIndex));
            }
        }

        setActiveId(null);
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    return (
        <SimpleGrid h="100%" cols={{ base: 1, sm: 2, md: 3 }}>
            {!mounted ? null : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={pointerWithin}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    {sections.map((section) => (
                        <TaskSection
                            key={section.id}
                            section={section}
                            tasks={tasks.filter(
                                (task) => task.status === section.id,
                            )}
                        ></TaskSection>
                    ))}

                    <DragOverlay>
                        {activeTask ? <TaskCard task={activeTask} /> : null}
                    </DragOverlay>
                </DndContext>
            )}
        </SimpleGrid>
    );
};
