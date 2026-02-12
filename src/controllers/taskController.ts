import type { Request, Response } from "express";
import type { Task } from "../models/task.js"; 
import * as taskService from "../services/taskService.js";
import { createTaskSchema, updateTaskSchema } from "../utils/taskValidator.js";


// Helper function: remove undefined values to satisfy exactOptionalPropertyTypes
function stripUndefinedToPartialTask(obj: unknown): Partial<Task> {
 
    const record = obj as Record<string, unknown>;
    const cleaned = Object.fromEntries(
        Object.entries(record).filter(([_, v]) => v !== undefined)
    );

    return cleaned as Partial<Task>;
  
}
// GET /tasks
export const getTasks = (req: Request, res: Response) => {
    res.json({ success: true, data: taskService.getAllTasks()})
};

// GET /tasks/:id
export const getTask = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const task = taskService.getTaskById(id);
    if(!task) return res.status(404).json({success: false, error: "Task not found"});
    res.json({ success: true, data: task});
};

// POST /tasks
export const createTask = (req: Request, res: Response) => {
    const validated = createTaskSchema.parse(req.body);
    const task = taskService.createTask(validated.title, validated.description);
    res.status(201).json({success: true, data: task});
}

// PATCH /tasks/:id
export const updateTask = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    // Validate the task ID
    if (isNaN(id)) {
        return res.status(400).json({success: false, error: "Invalid task ID"});
    }
    // Validate request body
    const validated = updateTaskSchema.parse(req.body);
    
    // Strip undefined fields from data
    const dataToUpdate: Partial<Task> = stripUndefinedToPartialTask(validated);

    // Ensure atleast one field to update
    if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ success: false, error: "No valid fields to update"});
    }
    // Update the task
    const task = taskService.updateTask(id, dataToUpdate);
    if (!task) {
        return res.status(404).json({success: false, error: "Task not found",});
    }
    res.json({success: true, data: task});
};


export const deleteTask = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const success = taskService.deleteTask(id);
    if (!success) return res.status(404).json({success: false, error: "Task not found"});
    res.json({success: true});
};