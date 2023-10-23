import { z } from "zod";
declare enum jobTypeStatus {
  ONSITE = "ONSITE",
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
}
export declare const addJobSchema: z.ZodObject<
  {
    department: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    salary: z.ZodNumber;
    jobType: z.ZodNativeEnum<typeof jobTypeStatus>;
  },
  "strip",
  z.ZodTypeAny,
  {
    department?: string;
    title?: string;
    description?: string;
    salary?: number;
    jobType?: jobTypeStatus;
  },
  {
    department?: string;
    title?: string;
    description?: string;
    salary?: number;
    jobType?: jobTypeStatus;
  }
>;
declare enum jobStatus {
  ACTIVE = "ACTIVE",
  CLOSE = "CLOSE",
}
export declare const jobStatusSchema: z.ZodObject<
  {
    status: z.ZodNativeEnum<typeof jobStatus>;
  },
  "strip",
  z.ZodTypeAny,
  {
    status?: jobStatus;
  },
  {
    status?: jobStatus;
  }
>;
export {};
