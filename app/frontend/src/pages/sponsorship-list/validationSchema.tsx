import { z } from "zod";

export const sponsorshipFormSchema = z
  .object({
    company: z.string().min(1, "Company name is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    jobTitle: z.string().min(1, "Job title is required"),
    experience: z.string().min(1, "Experience is required"),
    salary: z.string().min(1, "Salary range is required"),
    currency: z.string().min(1, "Required"),
    education: z.string().min(1, "This is required"),
    qualificationCountry: z.string().min(1, "This is required"),
    month: z.string().min(1, "Month is required"),
    year: z.string().min(1, "Year is required"),
    jobBoard: z.string().min(1, "Job board is required"),
    newJobBoardName: z.string().optional(),
    newJobBoardLink: z.string().optional()
  }).superRefine((data, ctx) => {
    if (data.jobBoard === "Other") {
      if (!data.newJobBoardName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Name is required",
          path: ["newJobBoardName"],
        });
      }
      if (!data.newJobBoardLink) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Link is required",
          path: ["newJobBoardLink"],
        });
      }
    }
  });
