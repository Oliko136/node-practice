import { controllerDecorator } from "../helpers/controllerDecorator.js";
import { listTasks, getOneTask, removeTask, addTask, modifyTask } from "../services/tasksService.js";
import HttpError from "../helpers/HttpError.js";

const getTasks = controllerDecorator(async (req, res) => {
    const result = await listTasks();

    res.json(result);
})

const getTaskById = controllerDecorator(async (req, res) => {
    const { id } = req.params;
    const result = await getOneTask(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
})

const deleteTask = controllerDecorator(async (req, res) => {
    const { id } = req.params;
    const result = await removeTask(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
});

const createTask = controllerDecorator(async (req, res) => {
    const result = await addTask(req.body);
    res.status(201).json(result);
})

const updateTask = controllerDecorator(async (req, res) => {
    const { id } = req.params;
    const result = await modifyTask(id, req.body);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
});

export default {
    getTasks,
    getTaskById,
    deleteTask,
    createTask,
    updateTask
}