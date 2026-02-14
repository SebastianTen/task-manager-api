import type { Task } from "./task.types.js";
import type { CreateTaskDTO, UpdateTaskDTO, TaskQueryOptions } from "./task.schema.js"
import { randomUUID } from "crypto";


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

export const getTasks = (options: TaskQueryOptions = {}): Task[] => {
  let result = [...tasks];

  if (options.completed !== undefined) {
    result = result.filter(t => t.completed === options.completed);
  }

  if (options.search) {
    result = result.filter(t =>
      t.title.includes(options.search!) || t.description?.includes(options.search!)
    );
  }

  if (options.sort) {
    result.sort((a, b) => {
      const aDate = a[options.sort!];
      const bDate = b[options.sort!];
      return (aDate && bDate ? aDate.getTime() - bDate.getTime() : 0);
    });
  }

  return result;
};



