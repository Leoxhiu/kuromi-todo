import { ActionIcon } from "@mantine/core";
import { ReactNode } from "react";

type NewItemButtonProps = {
    onClick: () => void;
    children: ReactNode;
};

export const NewItemButton = ({ onClick, children }: NewItemButtonProps) => {
    return <ActionIcon onClick={onClick}>{children}</ActionIcon>;
};
