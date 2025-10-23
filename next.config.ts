import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    outputFileTracingRoot: __dirname,
    experimental: {
        optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    },
};

export default nextConfig;
