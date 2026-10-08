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
			cssVariable: "--fontface-inter",
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

	vite: {
		build: {
			minify: 'terser',
		}
	},
})
