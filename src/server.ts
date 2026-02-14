import express from "express";
import {
  createTaskHandler,
  getTaskByIdHandler,
  updateTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
  patchTaskHandler
} from "./modules/tasks/task.controller.js";

const app = express();
app.use(express.json());

// Routes
app.post("/tasks", createTaskHandler);
app.get("/tasks", getTasksHandler);
app.get("/tasks/:id", getTaskByIdHandler);
app.put("/tasks/:id", updateTaskHandler);
app.patch("/tasks/:id", patchTaskHandler); 
app.delete("/tasks/:id", deleteTaskHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));