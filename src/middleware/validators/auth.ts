import { validateRequest } from "zod-express-middleware";
import { z } from "zod";

export const userLoginValidator = validateRequest({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Not a valid email" }),
    password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" }),
  }),
});
