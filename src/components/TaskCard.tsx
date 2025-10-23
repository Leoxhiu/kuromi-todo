import { Paper, Text } from "@mantine/core";

type TaskCardProps = {
    text?: string;
};

export const TaskCard = ({ text = "Write something..." }: TaskCardProps) => {
    return (
        <Paper p="md" radius="sm" withBorder>
            <Text>{text}</Text>
        </Paper>
    );
};
