import { z } from "zod";

export const addCandidateSchema = z.object({
  name: z.string({ required_error: "Candidate name is required" }),
  email: z.string({ required_error: "Candidate email is required" }).email(),
  jobTitle: z.string({ required_error: "Job title name is required" }),
  resume: z.string({ required_error: "Resume is required" }),
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
