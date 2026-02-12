import express from 'express';
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());

app.use("/tasks", taskRoutes);

app.get('/',(req, res) => {
    res.send('Hello World');
});

export default app;