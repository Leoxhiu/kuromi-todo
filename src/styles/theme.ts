"use client";

import { Button, createTheme, MantineColorsTuple } from "@mantine/core";
import { FONT_WEIGHTS } from "./fontWeights";

const themeColor: MantineColorsTuple = [
    "#f2f9ea",
    "#e6eede",
    "#cddac0",
    "#b7c9a4",
    "#9bb482",
    "#8da96f",
    "#85a365",
    "#728f53",
    "#647f48",
    "#546e39",
];
export const theme = createTheme({
    colors: {
        themeColor,
    },
    primaryColor: "themeColor",

    fontFamily: "DM Sans, sans-serif",

    // For Headings (Title)
    headings: {
        fontFamily: "DM Sans, sans-serif",
        fontWeight: "600",
        textWrap: "wrap",
        sizes: {
            h1: { fontSize: "48px" },
            h2: { fontSize: "30px" },
            h3: { fontSize: "24px" },
            h4: { fontSize: "20px" },
        },
    },

    // For Paragraph (Text)
    fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
    },

    shadows: {},

    defaultRadius: "sm",

    components: {
        Button: Button.extend({
            defaultProps: {
                fw: FONT_WEIGHTS.medium,
                radius: 4,
            },
            // vars: (theme, props) => {
            //     if (props.size === "sm") {
            //         return {
            //             root: {
            //                 "--button-height": "36px",
            //                 "--button-padding-x": "18px", // padding horizontal
            //                 "--button-fz": "14px", // font size
            //             },
            //         };
            //     }
            //     return { root: {} };
            // },
        }),
    },

    other: {
        fontWeights: FONT_WEIGHTS,
    },
});
