import { z } from 'zod';

export const DeliveryPerson = z.object({
  name: z.string(),
  cpf: z.string(),
  phone: z.string(),
  email: z.string(),
  status: z.string(),
  address: z.array(
    z.object({
      id: z.string(),
      postalCode: z.string(),
      street: z.string(),
      number: z.string(),
      district: z.string(),
      city: z.string(),
      state: z.string(),
      complement: z.string().optional(),
      reference: z.string().optional(),
      userId: z.string(),
    }),
  ),
});
