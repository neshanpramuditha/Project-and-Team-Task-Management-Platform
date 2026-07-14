import { z } from "zod";

const dateField = z.preprocess(
  (value) => {
    if (value === "" || value === undefined) {
      return null;
    }
    return value;
  },
  z.string().nullable().optional()
);

const baseProjectSchema = z.object({
  code: z
    .string()
    .trim()
    .min(3, "Project code must be at least 3 characters")
    .max(20, "Project code cannot exceed 20 characters"),

  title: z
    .string()
    .trim()
    .min(3, "Project title must be at least 3 characters")
    .max(100, "Project title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  status: z.enum(
    ["PLANNING", "ACTIVE", "COMPLETED", "CANCELLED"],
    {
      errorMap: () => ({
        message: "Invalid project status",
      }),
    }
  ),

  managerId: z.number({
    required_error: "Manager is required",
    invalid_type_error: "Manager ID must be a number",
  }),

  startDate: dateField,

  endDate: dateField,
});

export const createProjectSchema = baseProjectSchema;

export const updateProjectSchema = baseProjectSchema.partial();