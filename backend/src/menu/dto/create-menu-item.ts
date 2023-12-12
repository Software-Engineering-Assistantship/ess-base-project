import { z } from 'zod';

export const createMenuItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  category: z.string(),
});

export type CreateMenuItemSchema = z.infer<typeof createMenuItemSchema>;
