import * as z from "zod";

export const UserFormSchema = z.object({
  nome: z.string().min(5, { message: "O campo nome deve ter no mínimo 5 caracteres" }),
  cpf: z.string().length(11, { message: "O campo CPF deve ter 11 caracteres" }),
  dataNascimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: "A data de nascimento deve estar no formato DD/MM/YYYY" }),
  email: z.string().email({ message: "O email inserido não é válido" }),
  login: z.string(),
  senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export type UserFormType = z.infer<typeof UserFormSchema>;
