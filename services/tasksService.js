import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const taskPath = path.join('db', 'tasks.json');

export async function listTasks() {
    const tasks = await fs.readFile(taskPath);
    return JSON.parse(tasks);
}

export async function getOneTask(id) {
    const tasks = await listTasks();
    const [taskToGet] = tasks.filter(task => task.id === id);
    return taskToGet || null;
}

export async function removeTask(id) {
    const tasks = await listTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = tasks.splice(index, 1);
    await fs.writeFile(taskPath, JSON.stringify(tasks, null, 2));
    return result;
}

export async function addTask(body) {
    const tasks = await listTasks();
    const { name, description } = body;
    const newTask = {
        id: nanoid(),
        name,
        description
    }
    tasks.push(newTask);
    await fs.writeFile(taskPath, JSON.stringify(tasks, null, 2));
    return newTask;
}

export async function modifyTask(id, body) {
    const tasks = await listTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) {
        return null;
    }
    const taskToUpdate = tasks[index];
    const updatedTask = {
        ...taskToUpdate,
        ...body
    }
    tasks.splice(index, 1);
    tasks.push(updatedTask);
    await fs.writeFile(taskPath, JSON.stringify(tasks, null, 2));
    return updatedTask;
}