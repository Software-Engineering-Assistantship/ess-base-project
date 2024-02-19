import { z } from 'zod';

export const createRestaurantSchema = z.object({
  name: z.string(),
  address: z.string(),
  closingTime: z.date(),
  type: z.string(),
});

export type CreateRestaurantSchema = z.infer<typeof createRestaurantSchema>;
