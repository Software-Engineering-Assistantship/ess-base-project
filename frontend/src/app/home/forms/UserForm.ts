import * as z from "zod";

const isDateValid = (value: string): boolean => {
  // Verifica se a data está no formato DD/MM/YYYY
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!datePattern.test(value)) return false;

  // Extrai dia, mês e ano da data de nascimento
  const [, day, month, year] = value.split("/");
  const birthDate = new Date(`${year}-${month}-${day}`);

  // Calcula a data atual e a data limite (120 anos no passado)
  const currentDate = new Date();
  const minDate = new Date(currentDate.getFullYear() - 120, currentDate.getMonth(), currentDate.getDate());
  const maxDate = new Date(currentDate.getFullYear() - 8, currentDate.getMonth(), currentDate.getDate());

  // Verifica se a data está no passado e se a idade é menor ou igual a 120 anos e se a idade é maior ou igual a 8 anos
  return birthDate <= currentDate && birthDate >= minDate && birthDate <= maxDate;
};

export const UserFormSchema = z.object({
  nome: z
    .string()
    .min(5, { message: "O campo nome deve ter no mínimo 5 caracteres" }),
  cpf: z
    .string()
    .length(11, { message: "O campo CPF deve ter 11 caracteres" }),
  dataNascimento: z
    .string()
    .refine((value) => isDateValid(value), { message: "A data de nascimento não é válida" }),
  email: z
    .string()
    .email({ message: "O email inserido não é válido" }),
  login: z.string(),
  senha: z
    .string()
    .min(6, { message: "A senha não pode conter a data de nascimento ou o nome e deve ter no mínimo 6 caracteres" })
});

export type UserFormType = z.infer<typeof UserFormSchema>;

