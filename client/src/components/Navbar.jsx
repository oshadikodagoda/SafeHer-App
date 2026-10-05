import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiBell, FiMenu, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Safety Map', path: '/map' },
  { name: 'Emergency', path: '/emergency' },
  { name: 'My Reports', path: '/my-reports' },
  { name: 'Admin', path: '/admin' },
];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50 border-b border-purple-100">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* ===== LOGO (left) ===== */}
        <Link to="/" className="flex-shrink-0">
          <Logo size={40} />
        </Link>

        {/* ===== NAV LINKS (center, one line) ===== */}
        <div className="hidden lg:flex items-center gap-12 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive(link.path)
                  ? 'text-primary'
                  : 'text-neutral hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ===== RIGHT SIDE ACTIONS ===== */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Report Incident */}
          <Link
            to="/report"
            className="hidden md:inline-flex items-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-soft whitespace-nowrap"
          >
            Report Incident
          </Link>

          {/* SOS */}
          <button className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-soft-lg whitespace-nowrap">
            🆘 SOS
          </button>

          {/* Bell */}
          <button className="p-2 text-neutral hover:text-primary transition-colors relative">
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
          </button>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1.5 text-sm text-tertiary font-semibold whitespace-nowrap">
                <FiUser size={16} />
                {user.name.split(' ')[0]}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-neutral hover:text-secondary transition-colors"
                title="Logout"
              >
                <FiLogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-semibold text-primary hover:text-primary-dark px-3 py-2 whitespace-nowrap"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-3 py-2 rounded-xl transition-all whitespace-nowrap"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile menu */}
          <button className="lg:hidden p-2 text-neutral hover:text-primary">
            <FiMenu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;