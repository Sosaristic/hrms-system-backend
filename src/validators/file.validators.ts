import { z } from "zod";

export const FileValueSchema = z.object({
  fieldname: z.string({ required_error: "File is required" }),
  originalname: z.string({ required_error: "File is required" }),
  encoding: z.string({ required_error: "File is required" }),
  mimetype: z.string({ required_error: "File is required" }),
  destination: z.string({ required_error: "File is required" }),
  filename: z.string({ required_error: "File is required" }),
  path: z.string({ required_error: "File is required" }),
  size: z.number({ required_error: "File is required" }),
});

// export const FileSchema = z.object({
//   file: FileValueSchema,
// });
