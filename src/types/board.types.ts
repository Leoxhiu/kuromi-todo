export type ColumnId =
    | "PRIORITY"
    | "IN_PROGRESS"
    | "ON_HOLD"
    | "NOTE"
    | "TRASH";

export type Item = {
    id: string;
    content: string;
};

export type Board = Record<ColumnId, Item[]>;
