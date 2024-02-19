import { z } from 'zod';

export const updateMenuItemSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  categoryId: z.string().optional(),
});

export type UpdateMenuItemSchema = z.infer<typeof updateMenuItemSchema>;
