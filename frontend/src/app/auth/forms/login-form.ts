import { z } from "zod";

export const passwordValidation = z
  .string()
  .min(7, { message: "A senha deve ter mais de 6 dígitos" });
export const LoginSchema = z.object({
  username: z.string().min(3, {
    message: "Username deve ter pelo menos 3 caracteres",
  }),
  password: passwordValidation,
});

export type LoginFormInputs = z.infer<typeof LoginSchema>;
