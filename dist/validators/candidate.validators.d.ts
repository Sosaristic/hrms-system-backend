import { z } from "zod";
export declare const addCandidateSchema: z.ZodObject<
  {
    name: z.ZodString;
    email: z.ZodString;
    jobId: z.ZodString;
    phoneNumber: z.ZodOptional<z.ZodNumber>;
  },
  "strip",
  z.ZodTypeAny,
  {
    name?: string;
    email?: string;
    jobId?: string;
    phoneNumber?: number;
  },
  {
    name?: string;
    email?: string;
    jobId?: string;
    phoneNumber?: number;
  }
>;
declare enum candidateStatus {
  SELECTED = "SELECTED",
  REJECTED = "REJECTED",
  IN_PROGRESS = "IN PROGRESS",
}
export declare const candidateAcceptSchema: z.ZodObject<
  {
    candidateStatus: z.ZodNativeEnum<typeof candidateStatus>;
  },
  "strip",
  z.ZodTypeAny,
  {
    candidateStatus?: candidateStatus;
  },
  {
    candidateStatus?: candidateStatus;
  }
>;
export {};
