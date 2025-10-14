import "@mantine/core/styles.css";

import {
    ColorSchemeScript,
    MantineProvider,
    createTheme,
    mantineHtmlProps,
} from "@mantine/core";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kuromi Todo",
    description: "What should Kuromi do today?",
};

const theme = createTheme({
    fontFamily: "DM Sans",
    primaryColor: "violet",
    defaultRadius: "sm",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <style>
                    @import
                    url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
                </style>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider theme={theme}>{children}</MantineProvider>
            </body>
        </html>
    );
}
