import { z } from 'zod';

export const User = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras' })
    .nonempty({ message: 'O nome não pode ser vazio' }),
  phone: z
    .string()
    .regex(/^\+?[0-9]+$/, {
      message: 'O número de telefone deve conter apenas números',
    })
    .optional(),
  email: z.string().email({ message: 'Endereço de email inválido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
});

export const UpdateUser = User.partial();
