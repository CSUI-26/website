// @ts-check

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
	site: "https://zenith.csui.dev",
	prefetch: {
		defaultStrategy: 'viewport'
	},
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

	vite: {
		build: {
			minify: "terser",
		},
	},
});
