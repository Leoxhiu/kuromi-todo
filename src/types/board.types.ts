export type ColumnId = "PRIORITY" | "IN_PROGRESS" | "ON_HOLD" | "NOTE";

export type Task = {
    id: string;
    content: string;
};

export type Board = Record<ColumnId, Task[]>;
