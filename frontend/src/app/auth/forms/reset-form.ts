import { z } from "zod";

// Schema para validar a nova senha e confirmação da senha
export const ResetTokenSchema = z
  .object({
    token: z.string().min(1, { message: "Token é obrigatório" }),
    newPassword: z
      .string()
      .min(7, { message: "A senha deve ter mais de 6 dígitos" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], // path of error
  });

export type ResetTokenInputs = z.infer<typeof ResetTokenSchema>;

// Schema para validar a nova senha e confirmação da senha
export const passwordResetSchemaClient = z
  .object({
    newPassword: z
      .string()
      .min(7, { message: "A senha deve ter mais de 6 dígitos" })
      .refine(
        (val) =>
          !val.includes("nome") &&
          !val.includes("CPF") &&
          !val.includes("data de nascimento"),
        {
          message:
            "A senha não pode conter seu nome, CPF ou data de nascimento",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], //caminho para erro
  });
