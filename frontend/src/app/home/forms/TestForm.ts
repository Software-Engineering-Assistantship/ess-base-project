import * as z from "zod";

export const TestFormSchema = z.object({
  name: z
    .string()
    .min(5, { message: "O campo nome deve ter no mínimo 5 caracteres" }),
});

export type TestFormType = z.infer<typeof TestFormSchema>;
