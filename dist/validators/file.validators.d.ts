import { z } from "zod";
export declare const FileValueSchema: z.ZodObject<
  {
    fieldname: z.ZodString;
    originalname: z.ZodString;
    encoding: z.ZodString;
    mimetype: z.ZodString;
    destination: z.ZodString;
    filename: z.ZodString;
    path: z.ZodString;
    size: z.ZodNumber;
  },
  "strip",
  z.ZodTypeAny,
  {
    fieldname?: string;
    originalname?: string;
    encoding?: string;
    mimetype?: string;
    destination?: string;
    filename?: string;
    path?: string;
    size?: number;
  },
  {
    fieldname?: string;
    originalname?: string;
    encoding?: string;
    mimetype?: string;
    destination?: string;
    filename?: string;
    path?: string;
    size?: number;
  }
>;
