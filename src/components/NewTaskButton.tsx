"use client";

import { Button } from "@mantine/core";

type NewTODOButtonProps = {
    label?: string;
};

export const NewTODOButton = ({ label = "Add task" }: NewTODOButtonProps) => {
    const handleClick = () => {
        console.log("Button clicked");
    };

    return (
        <Button fullWidth variant="light" onClick={handleClick}>
            {label}
        </Button>
    );
};
