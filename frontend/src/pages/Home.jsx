import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiMap, FiPhone, FiAlertCircle } from 'react-icons/fi';
import communityHeart from '../assets/community-heart.png';

const Home = () => {
  return (
    <div className="min-h-screen bg-soft-pink">
      {/* ============ HERO SECTION ============ */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          <span className="badge bg-soft-lavender text-primary mb-5">
            🛡️ Community Care & Rapid Intervention
          </span>
          <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-tertiary leading-tight mb-6">
            Your Safety,
            <br />
            <span className="text-primary">Our Priority</span>
          </h1>
          <p className="text-neutral text-lg leading-relaxed mb-10 max-w-lg">
            Report incidents, view unsafe areas on a live map, and access
            emergency support — all in one secure platform designed for women.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/report" className="btn-primary">
              Report an Incident
            </Link>
            <Link to="/map" className="btn-outline">
              View Safety Map
            </Link>
          </div>
        </div>

        {/* Right: Community Illustration */}
        <div className="flex justify-center">
          <img
            src={communityHeart}
            alt="Community of women supporting each other"
            className="w-full max-w-xl mix-blend-multiply"
          />
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-tertiary mb-3">
            What SafeHer Offers
          </h2>
          <p className="text-neutral max-w-xl mx-auto">
            Everything you need to feel safer, in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<FiAlertCircle />}
            title="Report Incidents"
            desc="Quickly report harassment, stalking, or unsafe areas"
            color="text-secondary"
          />
          <FeatureCard
            icon={<FiMap />}
            title="Safety Map"
            desc="View color-coded unsafe zones in real time"
            color="text-primary"
          />
          <FeatureCard
            icon={<FiPhone />}
            title="Emergency Support"
            desc="One-tap access to police, helplines & hospitals"
            color="text-sos"
          />
          <FeatureCard
            icon={<FiShield />}
            title="Anonymous Reporting"
            desc="Your identity is protected by default"
            color="text-tertiary"
          />
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="card text-center bg-gradient-to-br from-soft-lavender to-pink-50 border-purple-200">
          <h2 className="text-3xl font-heading font-bold text-tertiary mb-4">
            Together, We Make Communities Safer
          </h2>
          <p className="text-neutral mb-8 max-w-xl mx-auto">
            Every report helps protect someone. Join thousands of women
            making their neighborhoods safer.
          </p>
          <Link to="/report" className="btn-sos inline-block">
            Start Reporting Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-sm text-neutral">
        <p>© 2026 SafeHer — Built with ❤️ for women's safety</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color }) => (
  <div className="card hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
    <div className={`${color} text-3xl mb-4`}>{icon}</div>
    <h3 className="font-heading font-bold text-lg mb-2 text-tertiary">
      {title}
    </h3>
    <p className="text-neutral text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Home;