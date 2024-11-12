import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import { remarkReadingTime } from './src/utils/readTime.ts'
import orama from "@orama/plugin-astro";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://daniel-prayer-2024.vercel.app/',
	markdown: {
		remarkPlugins: [remarkReadingTime],
		drafts: true,
		shikiConfig: {
			theme: 'material-theme-palenight',
			wrap: true
		}
	},
	integrations: [
		mdx({
			syntaxHighlight: 'shiki',
			shikiConfig: {
				experimentalThemes: {
					light: 'vitesse-light',
					dark: 'material-theme-palenight',
				},
				wrap: true
			},
			drafts: true
		}),
		sitemap(),
		tailwind(),
		orama({
			// We can generate more than one DB, with different configurations
			mydb: {
				pathMatcher: /\/post\/.+$/,
			}
		}),
		react(),
	]
})
