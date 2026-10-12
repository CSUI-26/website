// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import react from '@astrojs/react'
import compress from 'astro-compress'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Inter",
			display: "swap",
			weights: [ "100 900" ],
			cssVariable: "--fontface-inter",
			fallbacks: [ "sans-serif" ]
		}
	],

	integrations: [
		react(),
		compress({
			CSS: {
				lightningcss: true,
				csso: false
			},
		}),
		sitemap()
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
			minify: 'terser',
		}
	},
})
