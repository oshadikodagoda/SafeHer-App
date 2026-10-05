import React from 'react';
import { FiPhone, FiMapPin, FiShield, FiHeart, FiAlertCircle } from 'react-icons/fi';

const Emergency = () => {
  const emergencyContacts = [
    {
      category: 'Police Emergency',
      icon: <FiShield />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      contacts: [
        { name: 'Police Emergency Hotline', number: '119', note: '24/7 Emergency' },
        { name: 'Police Non-Emergency', number: '118', note: 'Non-urgent matters' },
        { name: 'Tourist Police', number: '1912', note: 'Tourist assistance' },
      ],
    },
    {
      category: 'Women\'s Helplines',
      icon: <FiHeart />,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      contacts: [
        { name: 'National Women\'s Helpline', number: '1938', note: '24/7 Support' },
        { name: 'Women In Need (WIN)', number: '011-4718585', note: 'Counseling & legal' },
        { name: 'CCC Line', number: '1333', note: 'Crisis support' },
      ],
    },
    {
      category: 'Medical & Hospitals',
      icon: <FiAlertCircle />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      contacts: [
        { name: 'Suwa Seriya Ambulance', number: '1990', note: 'Free ambulance' },
        { name: 'National Hospital Colombo', number: '011-2691111', note: '24/7 Emergency' },
        { name: 'Mental Health Helpline', number: '1926', note: 'Counseling' },
      ],
    },
    {
      category: 'Legal & Counseling',
      icon: <FiHeart />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      contacts: [
        { name: 'Legal Aid Commission', number: '011-2433618', note: 'Free legal help' },
        { name: 'Sumithrayo', number: '011-2696666', note: 'Emotional support' },
        { name: 'Shanthi Maargam', number: '071-7639898', note: 'Crisis intervention' },
      ],
    },
  ];

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-soft-pink">
      {/* ============ HEADER ============ */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="badge bg-red-100 text-red-700 mb-4">
            🆘 Emergency Support
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-tertiary mb-4">
            Help Is One Tap Away
          </h1>
          <p className="text-neutral text-lg">
            Instant access to emergency services, women's helplines,
            hospitals, and counseling support. Available 24/7.
          </p>
        </div>
      </section>

      {/* ============ QUICK SOS BUTTON ============ */}
      <section className="max-w-2xl mx-auto px-6 pb-12">
        <div className="card text-center bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <h2 className="text-2xl font-heading font-bold text-tertiary mb-3">
            In Immediate Danger?
          </h2>
          <p className="text-neutral text-sm mb-6">
            Call emergency services right now — don't wait.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleCall('119')}
              className="btn-sos inline-flex items-center gap-2"
            >
              <FiPhone /> Call 119 (Police)
            </button>
            <button
              onClick={() => handleCall('1990')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl transition-all shadow-soft flex items-center gap-2"
            >
              <FiPhone /> Call 1990 (Ambulance)
            </button>
          </div>
        </div>
      </section>

      {/* ============ CONTACT CATEGORIES ============ */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencyContacts.map((category) => (
            <div key={category.category} className="card">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <div
                  className={`${category.bgColor} ${category.color} p-3 rounded-xl text-2xl`}
                >
                  {category.icon}
                </div>
                <h2 className="font-heading font-bold text-lg text-tertiary">
                  {category.category}
                </h2>
              </div>

              {/* Contacts */}
              <div className="space-y-3">
                {category.contacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-soft-lavender transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-tertiary truncate">
                        {contact.name}
                      </p>
                      <p className="text-xs text-neutral mt-0.5">
                        {contact.note}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCall(contact.number)}
                      className="flex-shrink-0 bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5"
                    >
                      <FiPhone size={14} />
                      {contact.number}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SAFETY TIPS ============ */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="card bg-soft-lavender border-purple-200">
          <h2 className="font-heading font-bold text-xl text-tertiary mb-4">
            🛡️ Quick Safety Tips
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-neutral">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Share your live location with a trusted contact when traveling alone
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Save emergency numbers on speed dial
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Trust your instincts — leave if you feel unsafe
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Stay in well-lit, public areas when possible
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Report incidents to help protect others
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Keep your phone charged and accessible
            </li>
          </ul>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="text-center py-10 text-sm text-neutral">
        <p>© 2026 SafeHer — Emergency Support</p>
      </footer>
    </div>
  );
};

export default Emergency;