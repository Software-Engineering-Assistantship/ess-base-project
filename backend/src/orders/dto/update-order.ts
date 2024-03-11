import { z } from 'zod';

export const updateOrderSchema = z.object({
  rate: z.number().optional(),
  comment: z.string().optional(),
});

export type UpdateOrderSchema = z.infer<typeof updateOrderSchema>;
