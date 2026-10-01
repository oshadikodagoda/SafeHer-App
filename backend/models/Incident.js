// ============================================
// SafeHer - Incident Model
// ============================================

const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema(
  {
    // Who reported it
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Type of incident
    type: {
      type: String,
      required: [true, 'Incident type is required'],
      enum: [
        'Harassment',
        'Stalking',
        'Unsafe Area',
        'Assault',
        'Verbal Abuse',
        'Physical Abuse',
        'Other',
      ],
    },

    // Description
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },

    // Location (lat/lng + address)
    location: {
      latitude: {
        type: Number,
        required: [true, 'Latitude is required'],
      },
      longitude: {
        type: Number,
        required: [true, 'Longitude is required'],
      },
      address: {
        type: String,
        trim: true,
        default: '',
      },
    },

    // When did it happen
    incidentDate: {
      type: Date,
      required: [true, 'Incident date is required'],
    },

    // Optional photo (file path)
    photoUrl: {
      type: String,
      default: '',
    },

    // Report status (admin approves/rejects)
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },

    // Severity (for map color coding)
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },

    // Optional: was it reported anonymously?
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ============================================
// INDEXES (for faster queries)
// ============================================
incidentSchema.index({ 'location.latitude': 1, 'location.longitude': 1 });
incidentSchema.index({ type: 1 });
incidentSchema.index({ status: 1 });
incidentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Incident', incidentSchema);