import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUsers,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
  FiMapPin,
  FiRefreshCw,
} from 'react-icons/fi';
import { incidentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  // ============================================
  // REDIRECT IF NOT ADMIN
  // ============================================
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isAdmin) {
      setError('Access denied. Admin privileges required.');
      setLoading(false);
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // ============================================
  // FETCH DASHBOARD DATA
  // ============================================
  const fetchData = async () => {
    if (!isAdmin) return;

    setLoading(true);
    setError('');

    try {
      const [dashRes, incRes] = await Promise.all([
        incidentAPI.getDashboard(),
        incidentAPI.getAllAdmin(),
      ]);

      if (dashRes.data.success) {
        setDashboard(dashRes.data.dashboard);
      }
      if (incRes.data.success) {
        setIncidents(incRes.data.incidents);
      }
    } catch (err) {
      console.error('Admin fetch error:', err);
      setError(err.response?.data?.message || 'Could not load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [isAdmin]);

  // ============================================
  // APPROVE / REJECT INCIDENT
  // ============================================
  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await incidentAPI.updateStatus(id, status);
      if (res.data.success) {
        // Refresh data
        await fetchData();
      }
    } catch (err) {
      console.error('Update error:', err);
      alert(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  // ============================================
  // STATUS BADGE
  // ============================================
  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    return (
      <span className={`badge ${styles[status] || styles.pending}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  if (!isAuthenticated) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-soft-pink flex items-center justify-center px-6">
        <div className="card max-w-md text-center">
          <FiXCircle className="text-5xl text-red-500 mx-auto mb-4" />
          <h2 className="font-heading font-bold text-2xl text-tertiary mb-2">
            Access Denied
          </h2>
          <p className="text-neutral text-sm mb-6">
            You need admin privileges to access this page.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-pink">
      {/* ============ HEADER ============ */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="badge bg-soft-lavender text-primary mb-3">
              🛡️ Admin Intelligence
            </span>
            <h1 className="text-4xl font-heading font-extrabold text-tertiary">
              Dashboard
            </h1>
            <p className="text-neutral mt-2">
              Review reports, approve incidents, and analyze safety trends.
            </p>
          </div>

          <button
            onClick={fetchData}
            className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-semibold text-primary hover:bg-soft-lavender transition-all shadow-soft"
          >
            <FiRefreshCw /> Refresh
          </button>
        </div>
      </section>

      {/* ============ STATS CARDS ============ */}
      {dashboard && (
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<FiUsers />}
              label="Total Reports"
              value={dashboard.totalReports}
              color="text-primary"
              bgColor="bg-soft-lavender"
            />
            <StatCard
              icon={<FiAlertCircle />}
              label="Pending"
              value={dashboard.pendingCount}
              color="text-amber-600"
              bgColor="bg-amber-50"
            />
            <StatCard
              icon={<FiCheckCircle />}
              label="Approved"
              value={dashboard.approvedCount}
              color="text-green-600"
              bgColor="bg-green-50"
            />
            <StatCard
              icon={<FiXCircle />}
              label="Rejected"
              value={dashboard.rejectedCount}
              color="text-red-600"
              bgColor="bg-red-50"
            />
          </div>
        </section>
      )}

      {/* ============ ANALYTICS ============ */}
      {dashboard && (
        <section className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* By Type */}
          <div className="card">
            <div className="flex items-center gap-3 mb-5">
              <FiTrendingUp className="text-primary text-xl" />
              <h2 className="font-heading font-bold text-lg text-tertiary">
                Incidents by Type
              </h2>
            </div>
            {dashboard.byType.length === 0 ? (
              <p className="text-neutral text-sm text-center py-6">
                No data available yet
              </p>
            ) : (
              <div className="space-y-3">
                {dashboard.byType.map((item) => {
                  const percentage =
                    (item.count / dashboard.totalReports) * 100;
                  return (
                    <div key={item._id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold text-tertiary">
                          {item._id}
                        </span>
                        <span className="text-neutral">
                          {item.count} ({Math.round(percentage)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Top Locations */}
          <div className="card">
            <div className="flex items-center gap-3 mb-5">
              <FiMapPin className="text-secondary text-xl" />
              <h2 className="font-heading font-bold text-lg text-tertiary">
                Most Reported Locations
              </h2>
            </div>
            {dashboard.topLocations.length === 0 ? (
              <p className="text-neutral text-sm text-center py-6">
                No approved incidents with locations yet
              </p>
            ) : (
              <div className="space-y-3">
                {dashboard.topLocations.map((loc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-soft-lavender transition-colors"
                  >
                    <span className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-sm text-tertiary truncate">
                      {loc._id || 'Unknown location'}
                    </span>
                    <span className="badge bg-secondary text-white">
                      {loc.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============ INCIDENT MANAGEMENT ============ */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="card">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-xl text-tertiary">
              Manage Incidents
            </h2>
            <span className="text-sm text-neutral">
              {incidents.length} total
            </span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-neutral text-center py-10">Loading...</p>
          ) : incidents.length === 0 ? (
            <p className="text-neutral text-center py-10">
              No incidents reported yet
            </p>
          ) : (
            <div className="space-y-3">
              {incidents.map((incident) => (
                <div
                  key={incident._id}
                  className="border border-gray-100 rounded-xl p-4 hover:border-purple-200 transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-semibold text-tertiary">
                          {incident.type}
                        </h3>
                        {getStatusBadge(incident.status)}
                        <span className="text-xs text-neutral">
                          • {incident.severity} severity
                        </span>
                      </div>
                      <p className="text-sm text-neutral line-clamp-2 mb-2">
                        {incident.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-neutral">
                        {incident.location?.address && (
                          <span>📍 {incident.location.address}</span>
                        )}
                        <span>
                          👤 {incident.reportedBy?.name || 'Unknown'}
                        </span>
                        <span>
                          🕒{' '}
                          {new Date(incident.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-shrink-0">
                      {incident.status !== 'approved' && (
                        <button
                          onClick={() => updateStatus(incident._id, 'approved')}
                          disabled={updatingId === incident._id}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center gap-1.5"
                        >
                          <FiCheckCircle size={14} /> Approve
                        </button>
                      )}
                      {incident.status !== 'rejected' && (
                        <button
                          onClick={() => updateStatus(incident._id, 'rejected')}
                          disabled={updatingId === incident._id}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center gap-1.5"
                        >
                          <FiXCircle size={14} /> Reject
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ============================================
// STAT CARD COMPONENT
// ============================================
const StatCard = ({ icon, label, value, color, bgColor }) => (
  <div className="card">
    <div className={`${bgColor} ${color} p-3 rounded-xl text-xl inline-block mb-3`}>
      {icon}
    </div>
    <p className="text-3xl font-heading font-bold text-tertiary mb-1">
      {value}
    </p>
    <p className="text-sm text-neutral">{label}</p>
  </div>
);

export default AdminDashboard;