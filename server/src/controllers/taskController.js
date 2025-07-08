import Task from "../models/Task.js";

export const getTasks  = async (req,res) => {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
}

export const createTask = async (req, res) => {
    const { text, tags, deadline } = req.body;
    const task = new Task({
        userId: req.user.userId,
        text,
        tags,
        deadline
    });
    res.status(201).json(task);
}