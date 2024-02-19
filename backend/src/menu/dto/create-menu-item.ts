import { z } from 'zod';

export const createMenuItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  categoryId: z.string(),
});

export type CreateMenuItemSchema = z.infer<typeof createMenuItemSchema>;
