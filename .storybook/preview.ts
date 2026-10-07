import type { Preview } from '@storybook/react'
import { themes } from 'storybook/theming'

const preview = {
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			toc: true,
			codePanel: true,
		},
		darkMode: {
			current: 'dark',
			dark: {
				...themes.dark
			},
			light: {
				...themes.light
			}
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
} satisfies Preview
export default preview
