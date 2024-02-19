import { z } from 'zod';

const menuItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  categoryId: z.string(),
});

export const createOrderSchema = z.object({
  comment: z.string().optional(),
  rate: z.number().optional(),
  menuItems: z.array(menuItemSchema),
});

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;
