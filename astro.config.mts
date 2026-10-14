// @ts-check

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Inter",
			display: "swap",
			weights: ["100 900"],
			cssVariable: "--fontface-inter",
			fallbacks: ["sans-serif"],
		},
	],

	integrations: [
		react(),
		compress({
			CSS: {
				lightningcss: true,
				csso: false,
			},
			HTML: {
				"html-minifier-terser": {
					minifyCSS: false,
				},
			},
		}),
		sitemap(),
	],

	server: {
		host: true,
	},

	vite: {
		server: {
			allowedHosts: [".ts.net"],
			hmr: {
				clientPort: 8449,
			},
		},
		build: {
			minify: "terser",
		},
	},
});
