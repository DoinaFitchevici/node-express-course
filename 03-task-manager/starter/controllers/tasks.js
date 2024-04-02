const Task = require("../models/Task");
const getAllTasks = (req, res) => {
  res.send("All tasks from the file");
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

const getSingleTask = (req, res) => {
  res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  res.send("Updating a task");
};

const deleteTask = (req, res) => {
  res.send("Deleting a task");
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
