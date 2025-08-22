import { z } from "zod";

export const RecoverySchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

export type RecoveryFormInputs = z.infer<typeof RecoverySchema>;
