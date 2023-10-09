import { z } from "zod";

export const addCandidateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  jobTitle: z.string(),
  resume: z.string(),
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
