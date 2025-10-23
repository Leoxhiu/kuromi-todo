import { TaskSection } from "@/components/TaskSection";
import { Box, Container, SimpleGrid, Stack, Title } from "@mantine/core";

export default function Home() {
    return (
        <Container h="95vh" size="xl" mt="xl">
            <Stack h="100%" gap="xs">
                <Title order={2} ta="center">
                    To-do list!!
                </Title>
                <SimpleGrid h="100%" cols={{ base: 1, sm: 2, md: 3 }}>
                    <Box h="100%">
                        <TaskSection />
                    </Box>
                </SimpleGrid>
            </Stack>
        </Container>
    );
}
