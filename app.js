import express from 'express';
import cors from 'cors';
import tasksRouter from './routers/tasksRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

app.use((err, req, res, next) => {
    const { status = 500, message } = err;
    res.status(status).json(message ? message : "Internal server error");
})

app.listen(3000, () => {
    console.log('Server is running. Use our API on port: 3000');
})