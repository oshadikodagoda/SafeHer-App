import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiBell, FiMenu, FiLogOut, FiUser, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  
  // State to track if mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  // Function to trigger phone call
  const handleSOS = () => {
    window.location.href = 'tel:119';
  };

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50 border-b border-purple-100">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link to="/" className="flex-shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
          <Logo size={40} />
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-10 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive(link.path) ? 'text-primary' : 'text-neutral hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE ACTIONS (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
          <Link 
            to="/report" 
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-soft whitespace-nowrap"
          >
            Report Incident
          </Link>
          
          {/* SOS BUTTON - DIALS 119 */}
          <button 
            onClick={handleSOS}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-soft-lg whitespace-nowrap"
          >
            🆘 SOS
          </button>

          <button className="p-2 text-neutral hover:text-primary transition-colors relative">
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-sm text-tertiary font-semibold whitespace-nowrap">
                <FiUser size={16} /> {user.name.split(' ')[0]}
              </div>
              <button onClick={handleLogout} className="p-2 text-neutral hover:text-secondary transition-colors" title="Logout">
                <FiLogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm font-semibold text-primary hover:text-primary-dark px-3 py-2 whitespace-nowrap">
                Login
              </Link>
              <Link to="/register" className="text-sm font-semibold bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-3 py-2 rounded-xl transition-all whitespace-nowrap">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON (☰ or ✕) */}
        <div className="lg:hidden flex items-center gap-3">
          {/* Mobile SOS Button (Visible before clicking menu) */}
          <button 
            onClick={handleSOS}
            className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-soft"
          >
            🆘 SOS
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 text-neutral hover:text-primary"
          >
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-purple-100 px-4 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-base font-semibold py-2 ${
                isActive(link.path) ? 'text-primary' : 'text-neutral'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <Link to="/report" onClick={() => setIsMobileMenuOpen(false)} className="bg-primary text-white text-center font-semibold px-4 py-2.5 rounded-xl">
              Report Incident
            </Link>
            {isAuthenticated ? (
               <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full text-red-600 font-semibold py-2">
                 <FiLogOut /> Logout
               </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center font-semibold text-primary py-2">Login</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-center font-semibold bg-white border-2 border-primary text-primary py-2 rounded-xl">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;