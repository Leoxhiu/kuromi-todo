"use client";
import { Box, Button, Container } from "@mantine/core";

export default function Home() {
    const handleClick = () => {
        console.log("Button clicked");
    };

    return (
        <Container>
            <Box>
                <h1>Kuromi's TODOs</h1>
                <Button fullWidth variant="light" onClick={handleClick}>
                    Add task
                </Button>
            </Box>
        </Container>
    );
}
