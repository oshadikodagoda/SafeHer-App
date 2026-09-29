// ============================================
// SafeHer - Incident Controller
// ============================================

const Incident = require('../models/Incident');

// ============================================
// @desc    Create a new incident report
// @route   POST /api/incidents
// @access  Private (logged in users only)
// ============================================
const createIncident = async (req, res) => {
  try {
    const {
      type,
      description,
      latitude,
      longitude,
      address,
      incidentDate,
      severity,
      isAnonymous,
    } = req.body;

    // 1. Validate required fields
    if (
      !type ||
      !description ||
      !latitude ||
      !longitude ||
      !incidentDate
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide type, description, location, and incident date',
      });
    }

    // 2. Create the incident
    const incident = await Incident.create({
      reportedBy: req.user.id,
      type,
      description,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        address: address || '',
      },
      incidentDate,
      severity: severity || 'medium',
      isAnonymous: isAnonymous || false,
      photoUrl: req.file ? `/uploads/${req.file.filename}` : '',
    });

    // 3. Send response
    res.status(201).json({
      success: true,
      message: 'Incident reported successfully',
      incident,
    });
  } catch (error) {
    console.error('Create Incident Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while creating incident',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Get all incidents
// @route   GET /api/incidents
// @access  Public
// ============================================
const getAllIncidents = async (req, res) => {
  try {
    // Only show approved incidents to public (unless admin - we'll add later)
    const query = { status: 'approved' };

    const incidents = await Incident.find(query)
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: incidents.length,
      incidents,
    });
  } catch (error) {
    console.error('Get Incidents Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching incidents',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Get single incident by ID
// @route   GET /api/incidents/:id
// @access  Public
// ============================================
const getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id).populate(
      'reportedBy',
      'name email'
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Incident not found',
      });
    }

    res.status(200).json({
      success: true,
      incident,
    });
  } catch (error) {
    console.error('Get Incident Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Get incidents reported by current user
// @route   GET /api/incidents/my-reports
// @access  Private
// ============================================
const getMyIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ reportedBy: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: incidents.length,
      incidents,
    });
  } catch (error) {
    console.error('Get My Incidents Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Get incident statistics (for map heatmap)
// @route   GET /api/incidents/stats
// @access  Public
// ============================================
const getIncidentStats = async (req, res) => {
  try {
    const stats = await Incident.aggregate([
      { $match: { status: 'approved' } },
      {
        $group: {
          _id: {
            lat: { $round: ['$location.latitude', 2] },
            lng: { $round: ['$location.longitude', 2] },
          },
          count: { $sum: 1 },
          types: { $addToSet: '$type' },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Get Stats Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Get all incidents (Admin - all statuses)
// @route   GET /api/incidents/admin/all
// @access  Private/Admin
// ============================================
const getAllIncidentsAdmin = async (req, res) => {
  try {
    const incidents = await Incident.find({})
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: incidents.length,
      incidents,
    });
  } catch (error) {
    console.error('Admin Get Incidents Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Approve or reject an incident
// @route   PUT /api/incidents/:id/status
// @access  Private/Admin
// ============================================
const updateIncidentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Use: pending, approved, or rejected',
      });
    }

    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Incident not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `Incident ${status} successfully`,
      incident,
    });
  } catch (error) {
    console.error('Update Status Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// ============================================
// @desc    Get admin dashboard stats
// @route   GET /api/incidents/admin/dashboard
// @access  Private/Admin
// ============================================
const getAdminDashboard = async (req, res) => {
  try {
    // Total counts by status
    const totalReports = await Incident.countDocuments();
    const pendingCount = await Incident.countDocuments({ status: 'pending' });
    const approvedCount = await Incident.countDocuments({ status: 'approved' });
    const rejectedCount = await Incident.countDocuments({ status: 'rejected' });

    // Count by incident type
    const byType = await Incident.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Most reported locations
    const topLocations = await Incident.aggregate([
      { $match: { status: 'approved' } },
      {
        $group: {
          _id: '$location.address',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      success: true,
      dashboard: {
        totalReports,
        pendingCount,
        approvedCount,
        rejectedCount,
        byType,
        topLocations,
      },
    });
  } catch (error) {
    console.error('Dashboard Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  createIncident,
  getAllIncidents,
  getIncidentById,
  getMyIncidents,
  getIncidentStats,
  getAllIncidentsAdmin,
  updateIncidentStatus,
  getAdminDashboard,
};