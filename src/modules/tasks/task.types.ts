export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    completedAt?: Date;
}

export type TaskQueryOptions = Partial<{
    search: string;
    completed: boolean;
    sort: "createdAt" | "completedAt";
}>;