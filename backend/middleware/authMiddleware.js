// ============================================
// SafeHer - Auth Middleware
// Protects routes that require login
// ============================================

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ============================================
// @desc    Verify JWT and attach user to request
// ============================================
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token (remove "Bearer " prefix)
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from DB (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found. Please login again.',
        });
      }

      next(); // Continue to the route handler
    } catch (error) {
      console.error('Auth Middleware Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Invalid or expired token.',
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. No token provided.',
    });
  }
};

// ============================================
// @desc    Admin only access
// ============================================
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    });
  }
};

module.exports = { protect, adminOnly };