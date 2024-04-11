import express from 'express';
import tasksController from '../controllers/tasksController.js';
import { createTaskSchema, updateTaskSchema } from '../schemas/tasksSchemas.js';
import validateBody from '../helpers/validateBody.js';

const tasksRouter = express.Router();

tasksRouter.get('/', tasksController.getTasks);

tasksRouter.get('/:id', tasksController.getTaskById);

tasksRouter.delete('/:id', tasksController.deleteTask);

tasksRouter.post('/', validateBody(createTaskSchema), tasksController.createTask);

tasksRouter.put('/:id', validateBody(updateTaskSchema), tasksController.updateTask);

export default tasksRouter;