import { z } from "zod";

export const createProjectSchema = z.object({
  code: z
    .string()
    .min(3, "Project code is required")
    .max(20),

  title: z
    .string()
    .min(3, "Project title is required")
    .max(100),

  description: z
    .string()
    .max(500)
    .optional(),

  managerId: z
    .number({
      required_error: "Manager is required",
    }),

  startDate: z
    .string()
    .optional(),

  endDate: z
    .string()
    .optional()
});

export const updateProjectSchema = createProjectSchema.partial();


