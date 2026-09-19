// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import compress from 'astro-compress'
import compressor from 'astro-compressor'

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		compress({
			CSS: {
				lightningcss: true,
				csso: false
			},
		}),
		// compressor()
	],

	vite: {
		build: {
			minify: 'terser',
		}
	}
})
