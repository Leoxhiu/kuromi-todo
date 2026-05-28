import { COLUMN_IDS, ITEM_STATUS } from "constants/board.constants";

export type ColumnId = (typeof COLUMN_IDS)[keyof typeof COLUMN_IDS];

export type ItemStatus = (typeof ITEM_STATUS)[keyof typeof ITEM_STATUS];

export type Item = {
    id: string;
    content: string;
    status: ItemStatus;
};

export type Board = Record<ColumnId, Item[]>;
