// ============================================
// SafeHer - API Service
// Connects React frontend to Express backend
// ============================================

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// AUTO-ATTACH TOKEN TO EVERY REQUEST
// ============================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('safeher_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================
// API ENDPOINTS
// ============================================

// ---------- AUTH ----------
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

// ---------- INCIDENTS ----------
export const incidentAPI = {
  create: (data) => api.post('/incidents', data),
  getAll: () => api.get('/incidents'),
  getById: (id) => api.get(`/incidents/${id}`),
  getMyReports: () => api.get('/incidents/my-reports'),
  getStats: () => api.get('/incidents/stats'),
  
  // Admin
  getAllAdmin: () => api.get('/incidents/admin/all'),
  updateStatus: (id, status) => api.put(`/incidents/${id}/status`, { status }),
  getDashboard: () => api.get('/incidents/admin/dashboard'),
};

export default api;