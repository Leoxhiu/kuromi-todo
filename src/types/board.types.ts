export type ColumnId = "PRIORITY" | "IN_PROGRESS" | "DONE";

export type Task = {
    id: string;
    content: string;
};

export type Board = Record<ColumnId, Task[]>;
