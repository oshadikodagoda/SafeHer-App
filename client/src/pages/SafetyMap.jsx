import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';
import { incidentAPI } from '../services/api';

const SafetyMap = () => {
  const [incidents, setIncidents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  const defaultCenter = [6.9271, 79.8612];

  const fetchIncidents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await incidentAPI.getAll();
      if (res.data.success) {
        setIncidents(res.data.incidents);
        setFiltered(res.data.incidents);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Could not load incidents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFiltered(incidents);
    } else {
      setFiltered(incidents.filter((i) => i.severity === filter));
    }
  }, [filter, incidents]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return '#DC2626';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#8A2BE2';
    }
  };

  return (
    <div className="min-h-screen bg-soft-pink">
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className="text-center mb-8">
          <span className="badge bg-soft-lavender text-primary mb-4">
            🗺️ Live Safety Map
          </span>
          <h1 className="text-4xl font-heading font-extrabold text-tertiary mb-3">
            Safety Heatmap
          </h1>
          <p className="text-neutral max-w-xl mx-auto">
            View reported incidents across the city. Color-coded by severity.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <FiFilter className="text-neutral" />
            <span className="text-sm font-semibold text-tertiary mr-2">
              Filter:
            </span>
            {['all', 'high', 'medium', 'low'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === f
                    ? 'bg-primary text-white'
                    : 'bg-white text-neutral hover:bg-soft-lavender'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={fetchIncidents}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-sm font-semibold text-primary hover:bg-soft-lavender transition-all shadow-soft"
          >
            <FiRefreshCw /> Refresh
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
          <span className="font-semibold text-tertiary">Legend:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-neutral">High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-neutral">Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-neutral">Low Risk</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="rounded-2xl overflow-hidden shadow-soft-lg border border-purple-100">
          {loading ? (
            <div className="h-[600px] flex items-center justify-center bg-white">
              <p className="text-neutral">Loading map...</p>
            </div>
          ) : (
            <MapContainer
              center={defaultCenter}
              zoom={12}
              style={{ height: '600px', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {filtered.map((incident) => (
                <React.Fragment key={incident._id}>
                  <Circle
                    center={[
                      incident.location.latitude,
                      incident.location.longitude,
                    ]}
                    radius={300}
                    pathOptions={{
                      color: getSeverityColor(incident.severity),
                      fillColor: getSeverityColor(incident.severity),
                      fillOpacity: 0.2,
                    }}
                  />

                  <Marker
                    position={[
                      incident.location.latitude,
                      incident.location.longitude,
                    ]}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: getSeverityColor(incident.severity),
                            }}
                          ></span>
                          <strong className="text-tertiary">
                            {incident.type}
                          </strong>
                        </div>
                        <p className="text-sm text-neutral mb-2">
                          {incident.description}
                        </p>
                        {incident.location.address && (
                          <p className="text-xs text-neutral">
                            📍 {incident.location.address}
                          </p>
                        )}
                        <p className="text-xs text-neutral mt-2">
                          <strong>Severity:</strong> {incident.severity}
                        </p>
                        <p className="text-xs text-neutral">
                          <strong>Reported:</strong>{' '}
                          {new Date(incident.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              ))}
            </MapContainer>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-neutral">
          <p>
            Showing <strong>{filtered.length}</strong> approved incident
            {filtered.length !== 1 ? 's' : ''}
            {filter !== 'all' && ` (${filter} severity)`}
          </p>
          <p className="text-xs mt-2 text-neutral/70">
            ⚠️ Only admin-approved incidents appear on this map
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;