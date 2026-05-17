import { ActionIcon } from "@mantine/core";
import { ReactNode } from "react";

type NewTaskButtonProps = {
    onClick: () => void;
    children: ReactNode;
};

export const NewTaskButton = ({ onClick, children }: NewTaskButtonProps) => {
    return <ActionIcon onClick={onClick}>{children}</ActionIcon>;
};
