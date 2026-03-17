export type TaskStatus = "PRIORITY" | "IN_PROGRESS" | "DONE";

export type Task = {
    id: string;
    status: TaskStatus;
    content: string;
};

export type Section = {
    id: TaskStatus;
    title: string;
};
