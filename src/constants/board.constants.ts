export const COLUMN_IDS = {
    PRIORITY: "PRIORITY",
    IN_PROGRESS: "IN_PROGRESS",
    ON_HOLD: "ON_HOLD",
    NOTE: "NOTE",
    TRASH: "TRASH",
} as const;

export const ITEM_STATUS = {
    COMPLETED: "COMPLETED",
    INCOMPLETE: "INCOMPLETE",
} as const;

export const DND_TYPES = {
    TASK_COLUMN: "taskColumn",
    TASK_ITEM: "taskItem",

    NOTE_COLUMN: "noteColumn",
    NOTE_ITEM: "noteItem",
} as const;
