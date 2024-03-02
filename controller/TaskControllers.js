// controllers/taskController.js

const Task = require('../models/TasksModel');

// Get all tasks for a specific user
async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find({ user: req.params.userId });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Create a new task for a specific user
async function createTask(req, res) {
  try {
    const { title, description, dueDate } = req.body;
    const task = new Task({ title, description, dueDate, user: req.params.userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Update an existing task for a specific user
async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate({ _id: id, user: req.params.userId }, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

const completedTask = async (req, res) => {
  const { userId, id } = req.params;

  try {
    // Find the task by taskId and userId
    const task = await Task.findOne({ _id: id, user: userId });

    // If task is not found
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Toggle the completed status
    task.completed = !task.completed;

    // Save the updated task
    await task.save();

    res.status(200).json({ message: 'Task completed status updated successfully', task });
  } catch (error) {
    console.error('Error updating completed status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a task for a specific user
async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.params.userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask ,completedTask};
