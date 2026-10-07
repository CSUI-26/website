import { StorybookConfig } from "@storybook-astro/framework"
import { react } from '@storybook-astro/framework/integrations'

export default {
	framework: {
		name: '@storybook-astro/framework',
		options: {
			integrations: [
				react({ include: [ '**/react/**' ] }),
			],
		},
	},
	stories: [ '../src/**/*.stories.@(js|jsx|ts|tsx)' ],
	core: {
		disableTelemetry: true
	},
	addons: [ 'storybook-dark-mode' ],
} satisfies StorybookConfig
