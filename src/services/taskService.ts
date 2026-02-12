import type { Task } from "../models/task.js";

let tasks: Task[] = [];
let nextId = 1;

export const getAllTasks = (): Task[] => tasks;

export const getTaskById = (id: number): Task | undefined =>
    tasks.find(task => task.id === id);


export const createTask = (
    title: string,
    description?: string
): Task => {
    const task: Task = {
    id: nextId++,
    title,
    ...(description !== undefined && {description}),
    completed: false,
    };
    tasks.push(task);
    return task;
};

export const updateTask = (
    id: number,
    data: Partial<Task>
):  Task | null => {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    Object.assign(task,data);
    return task;
 };

export const deleteTask = (id: number): boolean => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true
};

