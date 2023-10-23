import { z } from "zod";

export const loginBodySchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Not a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Must be 8 or more characters long" }),
});

export const registerBodySchema = z.object({
  name: z.string({ required_error: "name is required" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Not a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Must be 8 or more characters long" }),
});

export const emailBodySchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Not a valid email" }),
});

export const passwordResetSchema = z
  .object({
    token: z.string(),
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
    },
  );
