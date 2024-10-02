import { z } from "zod";

export const reportFormSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(100, "Message must be less than 100 characters")
});
