const express = require('express');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.route('/')
  .get(protect, getAllTasks) // Get all tasks (protected)
  .post(protect, createTask); // Create a new task (protected)

router.route('/:id')
  .get(protect, getTaskById) // Get a task by ID (protected)
  .put(protect, updateTask) // Update task details (protected)
  .delete(protect, deleteTask); // Delete a task (protected)

router.patch('/:id/status', protect, updateTaskStatus); // Update task status (protected)

module.exports = router;
