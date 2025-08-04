const Task = require('../Models/task');

// Add new task
const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    const task = new Task({
      title,
      description,
      dueDate,
      userId: req.user.userId
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task' });
  }
};

// Get user tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

// Update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { status, description } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (status === 'completed' && task.dueDate > new Date()) {
      return res.status(400).json({ message: 'Cannot complete task before due date' });
    }

    if (status) task.status = status;
    if (description) task.description = description;

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// Get overdue tasks
const getOverdueTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.userId,
      dueDate: { $lt: new Date() },
      status: { $ne: 'completed' }
    });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch overdue tasks' });
  }
};

module.exports = { createTask, getTasks, updateTask, getOverdueTasks };
