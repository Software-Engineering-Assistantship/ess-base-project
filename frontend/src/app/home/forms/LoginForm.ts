import * as z from "zod";

export const LoginFormSchema = z.object({
  
  login: z.string(),
  senha: z.string()
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;