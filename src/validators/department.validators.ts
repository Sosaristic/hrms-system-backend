import { z } from "zod";

export const addDepartmentSchema = z.object({
  name: z.string(),
  departmentHead: z.string().optional(),
});

export const addHeadSchema = z.object({
  departmentHead: z.string(),
});
