import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    category: z.enum(['cardiology', 'neurology', 'pediatrics', 'general', 'nutrition', 'mental-health', 'oncology']),
  }),
});

export const collections = {
  'blog': blogCollection,
};
