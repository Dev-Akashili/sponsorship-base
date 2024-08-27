import { z } from "zod";

export const verifyEmailFormSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required")
});

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required")
});

export const resetPasswordFormSchema = z
  .object({
    password: z
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
    confirm: z.string().min(1, "Confirm Password is required")
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match"
  });

export const registerFormSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    gender: z.string({ required_error: "Gender is required" }),
    nationality: z.string({ required_error: "Nationality is required" }),
    password: z
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
    confirm: z.string().min(1, "Confirm Password is required")
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match"
  });
