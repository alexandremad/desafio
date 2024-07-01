// Alexandre Souza
const Task = require('../models/taskModel');
const moment = require('moment');

let tasks = []; 


function createTask(req, res) {
    const { title, description } = req.body;
    const newTask = new Task(tasks.length + 1, title, description);
    tasks.push(newTask);
    res.status(201).json(newTask);
}

function getTasks(req, res) {
    const { title, description } = req.query;
    let filteredTasks = tasks;
    if (title) {
        filteredTasks = filteredTasks.filter(task => task.title.includes(title));
    }
    if (description) {
        filteredTasks = filteredTasks.filter(task => task.description.includes(description));
    }
    res.json(filteredTasks);
}

function updateTask(req, res) {
    const taskId = parseInt(req.params.id);
    const { title, description } = req.body;

    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (!taskToUpdate) {
        return res.status(404).json({ error: 'Task not found' });
    }

    if (title) {
        taskToUpdate.title = title;
    }
    if (description) {
        taskToUpdate.description = description;
    }
    taskToUpdate.updatedAt = moment().format();

    res.json(taskToUpdate);
}

function deleteTask(req, res) {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === taskId);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(index, 1);
    res.status(204).end();
}

function completeTask(req, res) {
    const taskId = parseInt(req.params.id);

    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    if (task.completedAt) {
        task.completedAt = null;
    } else {
        task.completedAt = moment().format();
    }
    task.updatedAt = moment().format();

    res.json(task);
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    completeTask
};
