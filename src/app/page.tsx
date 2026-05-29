"use client";

import Board from "components/Board";
import { Container, Grid, Stack, Text, Title } from "@mantine/core";

export default function Home() {
    const today = new Date();

    return (
        <Container
            h={{ base: "100%", md: "95vh", lg: "95vh" }}
            size="xl"
            mt="xl"
            mb="sm"
        >
            <Stack h="100%" gap="xs">
                <Grid align="center">
                    <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                        <Text>
                            {today.toLocaleDateString("en-MY", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </Text>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                        <Title order={2} ta="center">
                            ( To-do list )
                        </Title>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                        {/* right side actions later */}
                    </Grid.Col>
                </Grid>

                <Board />
            </Stack>
        </Container>
    );
}
