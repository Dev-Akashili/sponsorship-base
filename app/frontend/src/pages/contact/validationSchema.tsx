import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email("Please enter a valid email"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(100, "Limit is 100 characters")
});
