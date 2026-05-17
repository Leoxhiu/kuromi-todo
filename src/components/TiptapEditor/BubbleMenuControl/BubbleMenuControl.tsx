import { ActionIcon } from "@mantine/core";
import { ReactNode } from "react";

interface BubbleMenuControlProps {
    active?: boolean;
    onClick: () => void;
    children: ReactNode;
}

const BubbleMenuControl = ({
    active,
    onClick,
    children,
}: BubbleMenuControlProps) => {
    return (
        <ActionIcon
            c={active ? undefined : "rgba(98,104,109,1)"}
            variant={active ? "light" : "default"}
            size="lg"
            onClick={onClick}
            type="button"
        >
            {children}
        </ActionIcon>
    );
};

export default BubbleMenuControl;
