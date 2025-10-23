import {
    Button,
    Group,
    Paper,
    ScrollAreaAutosize,
    Stack,
    Title,
} from "@mantine/core";
import { TaskCard } from "./TaskCard";

export const TaskSection = () => {
    return (
        <Paper h="100%" p="md" bg="violet.0" shadow="xs" withBorder>
            <Stack h="100%" gap="sm">
                <Group justify="space-between">
                    <Title order={4} fw="bold">
                        Priority
                    </Title>
                    <Button>Add</Button>
                </Group>

                <ScrollAreaAutosize
                    mah={750}
                    mx="auto"
                    type="scroll"
                    scrollbarSize={8}
                >
                    <Stack gap="xs">
                        <TaskCard
                            text="First task... Lorem Ipsum is simply dummy text
                                of the printing and typesetting industry. Lorem
                                Ipsum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown
                                printer took a gall"
                        ></TaskCard>
                        <TaskCard
                            text="First task... Lorem Ipsum is simply dummy text
                                of the printing and typesetting industry. Lorem
                                Ipsum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown
                                printer took a gall"
                        ></TaskCard>
                        <TaskCard
                            text="First task... Lorem Ipsum is simply dummy text
                                of the printing and typesetting industry. Lorem
                                Ipsum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown
                                printer took a gall"
                        ></TaskCard>
                        <TaskCard
                            text="First task... Lorem Ipsum is simply dummy text
                                of the printing and typesetting industry. Lorem
                                Ipsum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown
                                printer took a gall"
                        ></TaskCard>
                        <TaskCard text="Last 2 task..."></TaskCard>
                        <TaskCard
                            text="Last task...Final task... Lorem Ipsum is simply dummy text
                                of the printing and typesetting industry. Lorem
                                Ipsum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown
                                printer took a gall"
                        ></TaskCard>
                    </Stack>
                </ScrollAreaAutosize>
            </Stack>
        </Paper>
    );
};
