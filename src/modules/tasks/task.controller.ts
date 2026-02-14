import type { Request, Response } from "express";
import * as taskService from "./task.service.js";
import {
  createTaskSchema,
  updateTaskSchema,
  taskQuerySchema
} from "./task.schema.js";

import type { CreateTaskDTO, UpdateTaskDTO } from "./task.schema.js";

export const createTaskHandler = (req: Request, res: Response) => {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const task = taskService.createTask(parsed.data);
  return res.status(201).json(task);
};

export const getTaskByIdHandler = (req: Request<{ id: string }>, res: Response) => {
  const task = taskService.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  return res.json(task);
};

export const updateTaskHandler = (req: Request<{ id: string }>, res: Response) => {
  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const dto: UpdateTaskDTO = {};
  if (parsed.data.title !== undefined) dto.title = parsed.data.title;
  if (parsed.data.description !== undefined) dto.description = parsed.data.description;
  if (parsed.data.completed !== undefined) dto.completed = parsed.data.completed;

  const updated = taskService.updateTask(req.params.id, dto);
  if (!updated) return res.status(404).json({ message: "Task not found" });
  return res.json(updated);
};

export const patchTaskHandler = (req: Request<{ id: string }>, res: Response) => {
  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const dto: UpdateTaskDTO = {};
  if (parsed.data.title !== undefined) dto.title = parsed.data.title;
  if (parsed.data.description !== undefined) dto.description = parsed.data.description;
  if (parsed.data.completed !== undefined) dto.completed = parsed.data.completed;

  const updated = taskService.updateTask(req.params.id, dto);
  if (!updated) return res.status(404).json({ message: "Task not found" });
  return res.json(updated);
};

export const deleteTaskHandler = (req: Request<{ id: string }>, res: Response) => {
  const success = taskService.deleteTask(req.params.id);
  if (!success) return res.status(404).json({ message: "Task not found" });
  return res.status(204).send();
};

export const getTasksHandler = (req: Request, res: Response) => {
  const parsed = taskQuerySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const tasks = taskService.getTasks(parsed.data);
  return res.json(tasks);
};
