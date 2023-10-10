import { z } from "zod";

export const addEmployeeSchema = z
  .object({
    candidateId: z.string(),
    gender: z.string(),
    password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );
