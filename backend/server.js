// ============================================
// SafeHer Backend - Main Server File
// ============================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const dns = require('dns');

// ============================================
// DNS FIX (for local development on Windows)
// ============================================
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ============================================
// MIDDLEWARE
// ============================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images (only works locally, Vercel has a read-only filesystem)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================
// MONGODB CONNECTION (Vercel Serverless optimized)
// ============================================
const connectDB = async () => {
  try {
    // Check if we already have a connection (Vercel reuses connections)
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
  }
};

// Call connectDB on every request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ============================================
// IMPORT ROUTES
// ============================================
const authRoutes = require('./routes/authRoutes');
const incidentRoutes = require('./routes/incidentRoutes');

// ============================================
// USE ROUTES
// ============================================
app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);

// ============================================
// TEST ROUTE
// ============================================
app.get('/api', (req, res) => {
  res.json({
    message: '🚀 SafeHer API is running on Vercel!',
    status: 'success',
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// LOCAL DEVELOPMENT START
// ============================================
// Only listen on port if we are NOT on Vercel
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// ============================================
// EXPORT FOR VERCEL
// ============================================
module.exports = app;