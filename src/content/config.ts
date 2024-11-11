import { file } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    lang: z.enum(['it', 'en']).default('it'),
    untranslated: z.boolean().default(false),
    translationOf: reference('blog').optional(),
  }),
});

const events = defineCollection({
  loader: file('src/content/events/data.json', { parser: (text) => JSON.parse(text) }),

  schema: z.object({
    event: z.string(),
    location: z.string(),
    date: z.coerce.date(),
    eventLink: z.string().url().optional(),

    speaker: z.boolean().default(false),
    talk: z.string().optional(),
    slides: z.string().optional(),
    video: z.string().optional(),
    repo: z.string().optional(),
  }),
});

export const collections = { blog, events };
