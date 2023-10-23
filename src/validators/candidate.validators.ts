import { z } from "zod";

export const addCandidateSchema = z.object({
  name: z.string({ required_error: "Candidate name is required" }),
  email: z.string({ required_error: "Candidate email is required" }).email(),
  jobId: z.string({ required_error: "Job Id is required" }),
  phoneNumber: z.coerce.number().optional(),
});

enum candidateStatus {
  SELECTED = "SELECTED",
  REJECTED = "REJECTED",
  IN_PROGRESS = "IN PROGRESS",
}

export const candidateAcceptSchema = z.object({
  candidateStatus: z.nativeEnum(candidateStatus, {
    required_error: "Invalid Candidate Status",
  }),
});
