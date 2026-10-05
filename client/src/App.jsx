import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportIncident from './pages/ReportIncident';
import SafetyMap from './pages/SafetyMap';
import Emergency from './pages/Emergency';
import MyReports from './pages/MyReports';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<ReportIncident />} />
          <Route path="/map" element={<SafetyMap />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;