import { CATEGORIES } from '@/data/categories'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.date(),
			lastUpdated: z.date(),
			heroImage: image().optional(),
			youtubeId: z.string(),
			category: z.enum(CATEGORIES),
			tags: z.array(z.string())
		})
})

export const collections = { blog }
