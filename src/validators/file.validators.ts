import { z } from "zod";

const FileValueSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  destination: z.string(),
  filename: z.string(),
  path: z.string(),
  size: z.string(),
});

export const FileSchema = z.object({
  file: FileValueSchema,
});
