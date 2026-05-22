"use client";

import { useState, useEffect, useCallback } from "react";
import {
    DragDropProvider,
    DragOverlay,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { isSortable } from "@dnd-kit/react/sortable";
import { PointerSensor, PointerActivationConstraints } from "@dnd-kit/dom";
import { Grid } from "@mantine/core";
import { TaskSection } from "@/components/TaskSection";
import { Section, Task } from "types/tasks";
import { TaskCard } from "./TaskCard/TaskCard";

export const TaskContainer = () => {
    const sections: Section[] = [
        { id: "PRIORITY", title: "Priority" },
        { id: "IN_PROGRESS", title: "In Progress" },
        { id: "DONE", title: "Done" },
    ];

    const [tasks, setTasks] = useState<Task[]>([]);

    const [sourceId, setSourceId] = useState<string | null>(null);

    const [mounted, setMounted] = useState<boolean>(false);

    const activeTask = tasks.find((task) => task.id === sourceId);

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

    const handleAddTask = useCallback((sectionId: Section["id"]) => {
        const newTask: Task = {
            id: Date.now().toString(),
            status: sectionId,
            content: "New Task",
        };
        setTasks((tasks) => [newTask, ...tasks]); // Add new task to the top of the list for better visibility
    }, []);

    const handleContentChange = useCallback(
        (selectedTask: Task, content: string) => {
            setTasks((tasks) =>
                tasks.map((task) => {
                    if (task.id === selectedTask.id) {
                        return { ...task, content };
                    }

                    return task;
                }),
            );
        },
        [],
    );

    function isCrossSectionMove(targetId: Task["status"]): boolean {
        const sectionIds = sections.map((section) => section.id);
        return sectionIds.includes(targetId);
    }

    function handleDragStart(event: DragStartEvent) {
        const { source } = event.operation;
        const taskId = source!.id as string;

        setSourceId(taskId);
    }

    function handleDragOver(event: DragOverEvent) {
        const { source, target } = event.operation;

        if (!target) return;

        const sourceId = source!.id as string;
        const targetId = target.id as Task["status"];

        // Check if the target ID is a section ID (cross-section move)
        if (!isCrossSectionMove(targetId)) {
            return;
        }

        // Update task status on drag over for immediate visual feedback
        const newStatus = targetId as Task["status"];
        setTasks(() =>
            tasks.map((task) =>
                task.id === sourceId ? { ...task, status: newStatus } : task,
            ),
        );
    }

    function handleDragEnd(event: DragEndEvent) {
        const { operation, canceled } = event;
        const { source, target } = operation;

        if (!target) return;

        const targetId = target.id as Task["status"];

        // Check if the target ID is a section ID (cross-section move)
        if (canceled || isCrossSectionMove(targetId)) {
            return;
        }

        setTasks((tasks) => move(tasks, event));

        setSourceId(null);
    }

    // const sensors = (defaults) => [
    //     ...defaults.filter((sensor) => sensor !== PointerSensor),
    //     PointerSensor.configure({
    //         activationConstraints(event, source) {
    //             if (event.pointerType === "touch") {
    //                 return [
    //                     new PointerActivationConstraints.Delay({
    //                         value: 500,
    //                         tolerance: { x: 5, y: 5 },
    //                     }),
    //                 ];
    //             }
    //             return [
    //                 new PointerActivationConstraints.Distance({ value: 8 }),
    //             ];
    //         },
    //     }),
    // ];

    //TODO: Create a DnD Note section, Change Done section to On Hold section (Rename only, keep Done status)
    //TODO: Add Droppable Trash section to delete tasks from list
    //TODO: Add logic to the checkbox to mark tasks as Done, strikethrough and move down to the In Progress section
    //TODO: Add TextStyleKit extension to Tiptap editor

    return (
        <Grid h="100%" grow>
            {!mounted ? null : (
                <DragDropProvider
                    // sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    {sections.map((section) => (
                        <Grid.Col
                            key={section.id}
                            span={{ base: 12, md: 6, lg: 4 }}
                        >
                            <TaskSection
                                section={section}
                                tasks={tasks.filter(
                                    (task) => task.status === section.id,
                                )}
                                handleAddTask={handleAddTask}
                                handleContentChange={handleContentChange}
                            ></TaskSection>
                        </Grid.Col>
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
                                index={0}
                            />
                        ) : null}
                    </DragOverlay>
                </DragDropProvider>
            )}
        </Grid>
    );
};
