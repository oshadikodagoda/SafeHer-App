import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { incidentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ReportIncident = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    type: 'Harassment',
    description: '',
    latitude: '',
    longitude: '',
    address: '',
    incidentDate: new Date().toISOString().slice(0, 16),
    severity: 'medium',
    isAnonymous: false,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const incidentTypes = [
    'Harassment',
    'Stalking',
    'Unsafe Area',
    'Assault',
    'Verbal Abuse',
    'Physical Abuse',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError('');
  };

  // Get current location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
        setError('');
      },
      (err) => {
        setError('Could not get location: ' + err.message);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError('You must be logged in to report an incident');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await incidentAPI.create(formData);
      if (result.data.success) {
        setSuccess('Incident reported successfully! Redirecting...');
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft-pink py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="badge bg-soft-lavender text-primary mb-4">
            🛡️ Confidential Reporting
          </span>
          <h1 className="text-4xl font-heading font-extrabold text-tertiary mb-3">
            Report an Incident
          </h1>
          <p className="text-neutral max-w-lg mx-auto">
            Your report helps protect others. All information is securely
            stored and reviewed by our team.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
            ✅ {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="card">
          {/* Incident Type */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-tertiary mb-2">
              Incident Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input-field"
              required
            >
              {incidentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-tertiary mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe what happened... (minimum 10 characters)"
              className="input-field resize-none"
              minLength={10}
              required
            />
          </div>

          {/* Location Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-tertiary mb-2">
              Location *
            </label>

            <button
              type="button"
              onClick={handleGetLocation}
              className="btn-outline w-full mb-3 flex items-center justify-center gap-2"
            >
              <FiMapPin /> Use My Current Location
            </button>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Latitude"
                className="input-field"
                required
              />
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Longitude"
                className="input-field"
                required
              />
            </div>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address (optional, e.g., Pettah Bus Stand, Colombo)"
              className="input-field mt-4"
            />
          </div>

          {/* Date & Severity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-tertiary mb-2">
                <FiCalendar className="inline mr-1" /> Date & Time *
              </label>
              <input
                type="datetime-local"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-tertiary mb-2">
                <FiAlertCircle className="inline mr-1" /> Severity
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="input-field"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Anonymous */}
          <div className="mb-6 flex items-start gap-3 p-4 bg-soft-lavender rounded-xl">
            <input
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleChange}
              id="anonymous"
              className="mt-1 w-4 h-4 accent-primary"
            />
            <label htmlFor="anonymous" className="text-sm text-tertiary cursor-pointer">
              <strong>Report anonymously</strong>
              <br />
              <span className="text-neutral text-xs">
                Your identity will be hidden from public view. Only admins will see your report.
              </span>
            </label>
          </div>

          {/* Info Box */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
            <FiInfo className="text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              Your report will be reviewed by admins before appearing on the public map.
              This helps prevent false reports.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting Report...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;