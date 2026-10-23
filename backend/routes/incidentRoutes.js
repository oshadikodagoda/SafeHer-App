// ============================================
// SafeHer - Incident Routes
// ============================================

const express = require('express');
const router = express.Router();

const {
  createIncident,
  getAllIncidents,
  getIncidentById,
  getMyIncidents,
  getIncidentStats,
  getAllIncidentsAdmin,
  updateIncidentStatus,
  getAdminDashboard,
  deleteIncident,
} = require('../controllers/incidentController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// ============================================
// ADMIN ROUTES (must come before /:id route)
// ============================================
router.get('/admin/all', protect, adminOnly, getAllIncidentsAdmin);
router.get('/admin/dashboard', protect, adminOnly, getAdminDashboard);
router.put('/:id/status', protect, adminOnly, updateIncidentStatus);
router.delete('/:id', protect, adminOnly, deleteIncident);

// ============================================
// PUBLIC ROUTES
// ============================================
router.get('/', getAllIncidents);
router.get('/stats', getIncidentStats);

// ============================================
// PRIVATE ROUTES (login required)
// ============================================
router.post('/', protect, createIncident);
router.get('/my-reports', protect, getMyIncidents);

// ============================================
// DYNAMIC ROUTE (must come LAST)
// ============================================
router.get('/:id', getIncidentById);

module.exports = router;