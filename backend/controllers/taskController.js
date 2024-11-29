const Task = require('../models/Task');

// Get all tasks
const getAllTasks = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 tasks per page
  
    try {
      const tasks = await Task.find({ user: req.user.id })
        .sort({ dueDate: 1 }) // Sort by due date
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const total = await Task.countDocuments({ user: req.user.id });
  
      res.status(200).json({
        tasks,
        total,
        page,
        pages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks' });
    }
  };
  

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task' });
  }
};

// Create a new task
const createTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
  
    if (!title || !description || !dueDate || !priority) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const task = await Task.create({
        user: req.user.id,
        title,
        description,
        dueDate,
        priority, // New field
      });
  
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task' });
    }
  };
  

// Update task details
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }
    Object.assign(task, req.body); // Update fields dynamically
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.remove();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};

// Update task status
const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.status = req.body.status || task.status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
