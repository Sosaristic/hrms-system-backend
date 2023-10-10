import { z } from "zod";

export const addJobSchema = z.object({
  department: z.string(),
  title: z.string().email(),
  amount: z.coerce.number(),
  jobType: z.string(),
});

enum candidateStatus {
  ACTIVE = "ACTIVE",
  CLOSE = "CLOSE",
}

export const jobStatusSchema = z.object({
  status: z.nativeEnum(candidateStatus, {
    required_error: "Invalid Job Status",
  }),
});
