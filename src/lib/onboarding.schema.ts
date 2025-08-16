import { z } from 'zod';

export const onboardingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be 80 characters or less")
    .regex(/^[a-zA-Z\s'-]+$/, "Full name can only contain letters, spaces, ', -"),

  email: z.email("Invalid email address"),

  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be 100 characters or less"),

  servicesInterestedIn: z
    .array(z.string())
    .nonempty("Please select at least one service"),

  budget: z
    .string()
    .optional()
    .refine(
      (val) => {
        // Allow empty string
        if (!val) return true;
        // Check if the value is a valid integer
        const num = Number(val);
        return Number.isInteger(num) && num >= 100 && num <= 1000000;
      },
      {
        message: "Budget must be an integer between 100 and 1,000,000",
      }
    ),

  projectStartDate: z
    .string()
    .nonempty("A project start date is required")
    .refine(
      (str) => {
        const date = new Date(str);
        return (
          date.toString() !== "Invalid Date" &&
          date >= new Date(new Date().setHours(0, 0, 0, 0))
        );
      },
      { message: "Must be today or a later date" }
    ),

  acceptTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the terms",
    }),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;