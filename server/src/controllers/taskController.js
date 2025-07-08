import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { text, tags, deadline } = req.body;
  const task = await Task.create({
    userId: req.user.userId,
    text,
    tags,
    deadline,
  });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const updated = await Task.findOneAndUpdate(
    { _id: id, userId: req.user.userId },
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findOneAndDelete({ _id: id, userId: req.user.userId });
  res.status(204).end();
};
