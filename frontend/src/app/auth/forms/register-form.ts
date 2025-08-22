import { z } from "zod";

const passwordValidation = z
  .string()
  .min(7, { message: "A senha deve ter mais de 6 dígitos" });

export const RegisterClientSchema = z
  .object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z.string().email({ message: "E-mail inválido" }),
    username: z
      .string()
      .min(3, { message: "Usuário deve ter pelo menos 3 caracteres" }),
    password: passwordValidation,
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" }),
    phone: z
      .string()
      .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, { message: "Telefone inválido" }),
    birthDate: z.string(),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      const { password, name, cpf, birthDate } = data;

      if (name && password.includes(name)) {
        return false;
      }

      if (cpf) {
        const cpfDigits = cpf.replace(/[^\d]/g, "");
        if (password.includes(cpfDigits)) {
          return false;
        }
      }

      if (birthDate && password.includes(birthDate)) {
        return false;
      }

      return true;
    },
    {
      message: "A senha não pode conter seu nome, CPF ou data de nascimento",
      path: ["password"],
    }
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export const RegisterHotelierSchema = z
  .object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z.string().email({ message: "E-mail inválido" }),
    username: z
      .string()
      .min(3, { message: "Usuário deve ter pelo menos 3 caracteres" }),
    password: passwordValidation,
    hotel: z.string().min(1, { message: "Nome do Hotel é obrigatório" }),
    cep: z
      .string()
      .min(9, { message: "CEP é obrigatório e deve ter 8 dígitos" })
      .max(9, { message: "CEP deve ter 8 dígitos" }),
    address: z.string().min(1, { message: "Endereço do Hotel é obrigatório" }),
    city: z.string().min(1, { message: "Cidade é obrigatória" }),
    n_address: z.string().min(1, { message: "Nº é obrigatório" }),
    UF: z
      .string()
      .min(2, { message: "UF é obrigatório" })
      .max(2, { message: "UF deve ter 2 caracteres" }),
    cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
      message: "CNPJ Inválido",
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      const { password, name, hotel, cnpj } = data;

      const cnpjDigits = cnpj.replace(/[^\d]/g, "");

      if (password.includes(name)) {
        return false;
      }

      if (password.includes(hotel)) {
        return false;
      }

      if (password.includes(cnpjDigits)) {
        return false;
      }

      return true;
    },
    {
      message: "A senha não pode conter seu nome, o nome do hotel ou o CNPJ",
      path: ["password"],
    }
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export type RegisterClientFormInputs = z.infer<typeof RegisterClientSchema>;
export type RegisterHotelierFormInputs = z.infer<typeof RegisterHotelierSchema>;

export type RegisterClientFormInputsWithoutConfirmPassword = Omit<
  RegisterClientFormInputs,
  "confirmPassword"
>;
export type RegisterHotelierFormInputsWithoutConfirmPassword = Omit<
  RegisterHotelierFormInputs,
  "confirmPassword"
>;
