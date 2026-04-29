import { defineCollection, z } from 'astro:content';

const ingredientSchema = z.object({
  amount:   z.number().optional(),
  unit:     z.enum(['g', 'kg', 'ml', 'L', 'count']).optional(),
  weightG:  z.number().optional(),
  item:     z.string(),
  scalable: z.boolean().default(true),
});

const recipes = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    source:      z.string(),
    country:     z.string(),
    yield:       z.number(),
    yieldUnit:   z.string().default('servings'),
    tags:        z.array(z.string()).default([]),
    photo:       z.string().optional(),
    ingredients: z.array(ingredientSchema),
  }),
});

export const collections = { recipes };
