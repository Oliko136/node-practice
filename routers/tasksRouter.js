import express from 'express';
import tasksController from '../controllers/tasksController.js';

const tasksRouter = express.Router();

tasksRouter.get('/', tasksController.getTasks);

tasksRouter.get('/:id', tasksController.getTaskById);

tasksRouter.delete('/:id', tasksController.deleteTask);

tasksRouter.post('/', tasksController.createTask);

tasksRouter.put('/:id', tasksController.updateTask);

export default tasksRouter;