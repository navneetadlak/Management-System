const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Authentication Routes
router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser); // User login
router.get('/profile', protect, getUserProfile); // Get logged-in user's profile (protected)

module.exports = router;
