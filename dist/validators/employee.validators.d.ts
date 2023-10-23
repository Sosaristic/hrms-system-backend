import { z } from "zod";
declare enum employeeGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export declare const addEmployeeSchema: z.ZodEffects<
  z.ZodObject<
    {
      candidateId: z.ZodString;
      gender: z.ZodNativeEnum<typeof employeeGender>;
      image: z.ZodString;
      password: z.ZodString;
      confirmPassword: z.ZodString;
    },
    "strip",
    z.ZodTypeAny,
    {
      candidateId?: string;
      gender?: employeeGender;
      image?: string;
      password?: string;
      confirmPassword?: string;
    },
    {
      candidateId?: string;
      gender?: employeeGender;
      image?: string;
      password?: string;
      confirmPassword?: string;
    }
  >,
  {
    candidateId?: string;
    gender?: employeeGender;
    image?: string;
    password?: string;
    confirmPassword?: string;
  },
  {
    candidateId?: string;
    gender?: employeeGender;
    image?: string;
    password?: string;
    confirmPassword?: string;
  }
>;
export {};
