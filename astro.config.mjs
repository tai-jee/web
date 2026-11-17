import { defineConfig, envField, fontProviders } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import { cacheCloudflare } from "@astrojs/cloudflare/cache";

export default defineConfig({
    fonts: [
        {
            provider: fontProviders.local(),
            name: "Libron",
            cssVariable: "--libron",
            options: {
                variants: [
                    {
                        src: ["./src/fonts/Libron-Regular.woff2"],
                        weight: "normal",
                        style: "normal",
                    },
                    {
                        src: ["./src/fonts/Libron-Bold.woff2"],
                        weight: "bold",
                        style: "normal",
                    },
                    {
                        src: ["./src/fonts/Libron-Italic.woff2"],
                        weight: "normal",
                        style: "italic",
                    },
                    {
                        src: ["./src/fonts/Libron-BoldItalic.woff2"],
                        weight: "bold",
                        style: "italic",
                    },
                ],
            },
        },
    ],

    markdown: {
        shikiConfig: {
            theme: "css-variables",
        },
    },

    image: {
        remotePatterns: [{ protocol: "https" }],
    },

    adapter: cloudflare(),
    cache: cacheCloudflare(),

    env: {
        schema: {
            LASTFM_API_KEY: envField.string({
                context: "server",
                access: "secret",
            }),
        },
    },
});
