import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const productos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/productos' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      categoria: z.enum(['tortas', 'panificados']),
      precio: z.number().positive(),
      /** Aclaración del precio: "por unidad", "entera", etc. */
      unidad: z.string(),
      descripcion: z.string(),
      imagen: image(),
      porciones: z.string().optional(),
      destacado: z.boolean().default(false),
      orden: z.number().default(100),
    }),
});

export const collections = { productos };
