import { z } from "zod";

export const changePasswordFormSchema = z
  .object({
    current: z.string().min(1, "This is required"),
    new: z
      .string()
      .min(6, { message: "Passwords must be at least 6 characters." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Passwords must have at least one non alphanumeric character."
      })
      .regex(/\d/, {
        message: "Passwords must have at least one digit ('0'-'9')."
      })
      .regex(/[A-Z]/, {
        message: "Passwords must have at least one uppercase ('A'-'Z')."
      }),
    confirm: z.string().min(1, "This is required")
  })
  .refine((data) => data.new !== data.current, {
    path: ["new"],
    message: "Use a new password"
  })
  .refine((data) => data.new === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match"
  });
