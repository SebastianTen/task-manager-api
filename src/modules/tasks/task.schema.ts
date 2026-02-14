import { z } from "zod";
import type { Task } from "./task.types.js";

export const createTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    completed: z.boolean().optional()
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
});
export type UpdateTaskDTO = Partial<Pick<Task, "title" | "description" | "completed">>;

export const taskQuerySchema = z.object({
    search: z.string().optional(),
    completed: z.boolean().optional(),
    sort: z.enum(["createdAt", "completedAt"]).optional()
});

export type TaskQueryOptions = z.infer<typeof taskQuerySchema>;