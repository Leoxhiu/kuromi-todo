import Board from "components/Board";
import { Container, Stack, Title } from "@mantine/core";

export default function Home() {
    return (
        <Container h="95vh" size="xl" mt="xl">
            <Stack h="100%" gap="xs">
                <Title order={2} ta="center">
                    ( To-do list )
                </Title>
                <Board />
            </Stack>
        </Container>
    );
}
