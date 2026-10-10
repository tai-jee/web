import { defineConfig, fontProviders } from "astro/config";

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
});
