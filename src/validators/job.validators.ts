import { z } from "zod";

enum jobTypeStatus {
  ONSITE = "ONSITE",
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
}
export const addJobSchema = z.object({
  department: z.string(),
  title: z.string(),
  description: z.string().optional(),
  salary: z.coerce.number(),
  jobType: z.nativeEnum(jobTypeStatus, {
    required_error: "Invalid  JobType ",
  }),
});

enum jobStatus {
  ACTIVE = "ACTIVE",
  CLOSE = "CLOSE",
}

export const jobStatusSchema = z.object({
  status: z.nativeEnum(jobStatus, {
    required_error: "Invalid Job Status",
  }),
});
