import type { Task } from "./task.types.js";
import type { CreateTaskDTO, UpdateTaskDTO, TaskQueryOptions } from "./task.schema.js"
import { randomUUID } from "crypto";
import { toLowerCase } from "zod";


let tasks: Task[] = [];


export const createTask = (data: CreateTaskDTO): Task => {
    const newTask: Task = {
    id: randomUUID(),
    title: data.title,
    completed: data.completed ?? false,
    createdAt: new Date(),
    ...(data.description !== undefined && {description: data.description})
    };

    tasks.push(newTask);
    return newTask;
};

export const getTaskById = (id: string): Task | null => {
    return tasks.find(t => t.id === id) ?? null;
}

export const updateTask = (id: string, data: UpdateTaskDTO):  Task | null => {
   
    const existing = tasks.find(t => t.id === id);
    if (!existing) return null;

    const updated: Task = {
       ...existing,
       ...(data.title !== undefined && {title: data.title}),
       ...(data.description !== undefined && { description: data.description}),
       ...(data.completed !== undefined && {completed: data.completed}),
       ...(data.completed === true && { completedAt: new Date() }),
       ...(data.completed === false ? {} : {})
    };
    tasks = tasks.map(t => (t.id === id ? updated : t));
    return updated;
 };

export const deleteTask = (id: string): boolean => {
    const lengthBefore = tasks.length;
    tasks = tasks.filter(t => t.id !== id);
    return tasks.length < lengthBefore;
};

export const getTasks = (options?: TaskQueryOptions): Task[] => {
  let filtered = [...tasks];

  if (options?.completed !== undefined) {
    filtered = filtered.filter(t => t.completed === options.completed);
  }

  if (options?.search) {
    const term = options.search.toLowerCase();
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(term) || t.description?.toLowerCase().includes(term)
    );
  }

  if (options?.sort) {
    filtered.sort((a, b) => {
      const key = options.sort!;
      const aValue = a[key] ?? 0;
      const bValue = b[key] ?? 0;
      return aValue > bValue ? 1 : -1;
    });
  }

  return filtered;
};



