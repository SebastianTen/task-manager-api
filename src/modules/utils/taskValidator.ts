import { z } from "zod";

export const getTaskQuerySchema = z.object({
    search: z.string().optional(),
    completed: z.preprocess(val => val === "true" ? true : val === "false" ? false : val, z.boolean()).optional(),
    sort: z.enum(["createdAt", "completedAt"]).optional()
});