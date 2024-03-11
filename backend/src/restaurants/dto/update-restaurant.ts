import { z } from 'zod';

export const updateRestaurantSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  closingTime: z.date().optional(),
  type: z.string().optional(),
  picture: z.string().optional(),
});

export type UpdateRestaurantSchema = z.infer<typeof updateRestaurantSchema>;
