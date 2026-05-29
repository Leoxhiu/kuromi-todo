import "@/styles/global.css";
import { DM_Sans } from "next/font/google";

import "@mantine/core/styles.css";
import {
    ColorSchemeScript,
    MantineProvider,
    mantineHtmlProps,
} from "@mantine/core";
import { theme } from "@/styles/theme";

import { Metadata } from "next";

// Global font setup using Next.js font optimization
const dmSans = DM_Sans({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    style: ["italic", "normal"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Kuromi Todo",
    description: "What should Kuromi do today?",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" {...mantineHtmlProps} className={dmSans.className}>
            <head>
                <meta name="Kuromi Todo" content="Kuromi Todo" />
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider theme={theme}>{children}</MantineProvider>
            </body>
        </html>
    );
}
