import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3, "Title is required"),

  description: z.string().optional(),

  projectId: z.number(),

  assignedTo: z.number(),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "URGENT"
  ]),

  dueDate: z.string().optional()
});

export const updateTaskSchema = createTaskSchema.partial();

export const updateTaskStatusSchema = z.object({
  status: z.enum([
    "TODO",
    "IN_PROGRESS",
    "REVIEW",
    "DONE"
  ])
});