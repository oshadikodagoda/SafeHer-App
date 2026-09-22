// ============================================
// SafeHer - Authentication Controller
// ============================================

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// ============================================
// HELPER: Generate JWT Token
// ============================================
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// ============================================
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
// ============================================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // 3. Create new user (password auto-hashed by User model)
    const user = await User.create({
      name,
      email,
      password,
      phone: phone || '',
    });

    // 4. Generate JWT token
    const token = generateToken(user._id);

    // 5. Send response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// ============================================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // 2. Find user by email (need +password because select: false)
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+password'
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // 3. Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // 4. Generate token
    const token = generateToken(user._id);

    // 5. Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
// ============================================
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};