import TaskBoard from "components/TaskBoard";
import { Box, Container, Stack, Title } from "@mantine/core";

export default function Home() {
    return (
        <Container h="95vh" size="xl" mt="xl">
            <Stack h="100%" gap="xs">
                <Title order={2} ta="center">
                    To-do list!!
                </Title>
                <Box flex={1} mih={0}>
                    <TaskBoard />
                </Box>
            </Stack>
        </Container>
    );
}
