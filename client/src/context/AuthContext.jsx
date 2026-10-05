// ============================================
// SafeHer - Authentication Context
// Manages user login state across the app
// ============================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedToken = localStorage.getItem('safeher_token');
    const savedUser = localStorage.getItem('safeher_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Save login data
  const saveLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('safeher_token', authToken);
    localStorage.setItem('safeher_user', JSON.stringify(userData));
  };

  // Register
  const register = async (userData) => {
    const response = await authAPI.register(userData);
    if (response.data.success) {
      saveLogin(response.data.user, response.data.token);
    }
    return response.data;
  };

  // Login
  const login = async (credentials) => {
    const response = await authAPI.login(credentials);
    if (response.data.success) {
      saveLogin(response.data.user, response.data.token);
    }
    return response.data;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('safeher_token');
    localStorage.removeItem('safeher_user');
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};