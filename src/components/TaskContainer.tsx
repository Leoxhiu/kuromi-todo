"use client";

import { useState, useEffect } from "react";
import {
    DndContext,
    DragOverlay,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    DragCancelEvent,
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
            status: "IN_PROGRESS",
            content: "This is task 1",
        },
        {
            id: "2",
            status: "IN_PROGRESS",
            content: "This is task 2",
        },
        {
            id: "3",
            status: "IN_PROGRESS",
            content: "This is task 3",
        },
        {
            id: "4",
            status: "IN_PROGRESS",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
    ];

    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const invertedTasks = [...tasks].reverse();

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

    function isCrossSectionMove(overId: Task["status"]): boolean {
        const sectionIds = sections.map((section) => section.id);
        return sectionIds.includes(overId);
    }

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const taskId = active.id as string;

        setActiveId(taskId);
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as Task["status"];

        // Check if the over ID is a section ID (cross-section move)
        if (!isCrossSectionMove(overId)) {
            return;
        }

        // Update task status on drag over for immediate visual feedback
        const newStatus = overId as Task["status"];
        setTasks(() =>
            tasks.map((task) =>
                task.id === activeId ? { ...task, status: newStatus } : task,
            ),
        );
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as Task["status"];

        // Check if the over ID is a section ID (cross-section move)
        if (isCrossSectionMove(overId)) {
            return;
        }

        // Within-section reorder
        const oldIndex = tasks.findIndex((task) => task.id === activeId);
        const newIndex = tasks.findIndex((task) => task.id === overId);

        if (oldIndex !== -1 && newIndex !== -1) {
            setTasks((tasks) => arrayMove(tasks, oldIndex, newIndex));
        }

        setActiveId(null);
    }

    function handleDragCancel(event: DragCancelEvent) {
        void event;
        setActiveId(null);
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 50, // Delay on dragging to prevent accidental drags when clicking
                tolerance: 5, // Allow a small movement before activating the drag
            },
        }),
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
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                >
                    {sections.map((section) => (
                        <TaskSection
                            key={section.id}
                            section={section}
                            tasks={invertedTasks.filter(
                                (task) => task.status === section.id,
                            )}
                        ></TaskSection>
                    ))}

                    <DragOverlay>
                        {activeTask ? (
                            <TaskCard
                                injectStyle={{
                                    cursor: "grabbing",
                                    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
                                    border: "2px solid rgba(0, 0, 0, 0.59)",
                                }}
                                task={activeTask}
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            )}
        </SimpleGrid>
    );
};
