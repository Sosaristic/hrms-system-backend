import { z } from "zod";
export declare const addDepartmentSchema: z.ZodObject<
  {
    name: z.ZodString;
    departmentHead: z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    name?: string;
    departmentHead?: string;
  },
  {
    name?: string;
    departmentHead?: string;
  }
>;
export declare const addHeadSchema: z.ZodObject<
  {
    departmentHead: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    departmentHead?: string;
  },
  {
    departmentHead?: string;
  }
>;
