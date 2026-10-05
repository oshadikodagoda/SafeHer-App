import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiFileText, FiCalendar, FiMapPin, FiRefreshCw } from 'react-icons/fi';
import { incidentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const MyReports = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user's reports
  const fetchReports = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await incidentAPI.getMyReports();
      if (res.data.success) {
        setReports(res.data.incidents);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.response?.data?.message || 'Could not load reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line
  }, [isAuthenticated]);

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

  // ============================================
  // SEVERITY DOT
  // ============================================
  const getSeverityDot = (severity) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-amber-500',
      low: 'bg-emerald-500',
    };
    return (
      <span className={`inline-block w-2.5 h-2.5 rounded-full ${colors[severity] || 'bg-purple-500'}`}></span>
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-soft-pink">
      {/* ============ HEADER ============ */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="badge bg-soft-lavender text-primary mb-3">
              📄 Your Report History
            </span>
            <h1 className="text-4xl font-heading font-extrabold text-tertiary">
              My Reports
            </h1>
            <p className="text-neutral mt-2">
              Hi <strong>{user?.name?.split(' ')[0]}</strong> — here are all the incidents you've reported.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={fetchReports}
              className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-semibold text-primary hover:bg-soft-lavender transition-all shadow-soft"
            >
              <FiRefreshCw /> Refresh
            </button>
            <Link
              to="/report"
              className="btn-primary inline-flex items-center gap-2"
            >
              + New Report
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CONTENT ============ */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="card text-center py-16">
            <p className="text-neutral">Loading your reports...</p>
          </div>
        ) : reports.length === 0 ? (
          /* Empty State */
          <div className="card text-center py-16">
            <FiFileText className="mx-auto text-5xl text-neutral/40 mb-4" />
            <h3 className="font-heading font-bold text-xl text-tertiary mb-2">
              No Reports Yet
            </h3>
            <p className="text-neutral text-sm mb-6 max-w-md mx-auto">
              You haven't reported any incidents yet. Your reports help
              protect other women in your community.
            </p>
            <Link to="/report" className="btn-primary inline-block">
              Report Your First Incident
            </Link>
          </div>
        ) : (
          /* Reports Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reports.map((report) => (
              <div
                key={report._id}
                className="card hover:shadow-soft-lg transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    {getSeverityDot(report.severity)}
                    <h3 className="font-heading font-bold text-lg text-tertiary">
                      {report.type}
                    </h3>
                  </div>
                  {getStatusBadge(report.status)}
                </div>

                {/* Description */}
                <p className="text-sm text-neutral leading-relaxed mb-4 line-clamp-3">
                  {report.description}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  {report.location?.address && (
                    <div className="flex items-center gap-2 text-xs text-neutral">
                      <FiMapPin className="text-primary flex-shrink-0" />
                      <span className="truncate">{report.location.address}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-neutral">
                    <FiCalendar className="text-primary flex-shrink-0" />
                    <span>
                      Reported on{' '}
                      {new Date(report.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-neutral">
                    <strong className="text-tertiary">Severity:</strong>{' '}
                    <span className="capitalize">{report.severity}</span>
                  </span>
                  {report.isAnonymous && (
                    <span className="badge bg-soft-lavender text-primary">
                      Anonymous
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {reports.length > 0 && (
          <div className="mt-8 text-center text-sm text-neutral">
            Showing <strong>{reports.length}</strong> report
            {reports.length !== 1 ? 's' : ''}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyReports;