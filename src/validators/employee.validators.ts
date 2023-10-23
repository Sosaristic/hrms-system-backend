import { z } from "zod";

enum employeeGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export const addEmployeeSchema = z
  .object({
    candidateId: z.string({ required_error: "candidateId is required" }),
    gender: z.nativeEnum(employeeGender, {
      required_error: "Invalid  Gender",
    }),
    image: z.string({ required_error: "Profile image is required" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Pasword must be 8 or more characters long" }),
    confirmPassword: z
      .string({ required_error: "confirmPassword is required" })
      .min(8, { message: "Password must be 8 or more characters long" }),
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
