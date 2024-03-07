import * as z from "zod";

export const UserUpdateFormSchema = z.object({
  nome: z
    .string()
    .refine(value => !value || value.length >= 5, { message: "O campo nome deve ter no mínimo 5 caracteres" }),
  login: z.string(),
  senha: z
    .string()
    .min(6, { message: "A senha não pode conter a data de nascimento ou o nome e deve ter no mínimo 6 caracteres" })
});

export type UserUpdateFormType = z.infer<typeof UserUpdateFormSchema>;

