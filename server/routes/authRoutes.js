// ============================================
// SafeHer - Authentication Routes
// ============================================

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/authController');

// ============================================
// ROUTES
// ============================================

// POST /api/auth/register  → Create new user
router.post('/register', registerUser);

// POST /api/auth/login     → Login user
router.post('/login', loginUser);

// GET /api/auth/me         → Get current user (private - we'll add middleware later)
// router.get('/me', protect, getMe);  ← enable later after auth middleware

module.exports = router;