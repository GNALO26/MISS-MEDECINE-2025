import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Candidats', href: '/candidates' },
    { name: 'Voter', href: '/vote' },
    { name: 'Admin', href: '/admin' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'header-transparent shadow-lg' : 'bg-white'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo centré élégant */}
          <Link to="/" className="flex flex-col items-center text-center">
            <span className="typography-cursive text-3xl md:text-4xl text-gold-600 leading-none">
              Miss & Mister
            </span>
            <span className="font-sans text-xs md:text-sm font-bold tracking-widest text-charcoal-900 uppercase mt-1">
              FSS Médecine 2025
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-sans font-medium text-sm uppercase tracking-wider transition-all duration-300 relative py-2 ${
                  isActive(item.href)
                    ? 'text-gold-600'
                    : 'text-charcoal-700 hover:text-gold-500'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-500"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Bouton Menu Mobile */}
          <button
            className="md:hidden p-2 rounded-lg text-charcoal-700 hover:text-gold-500 hover:bg-gold-50 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg border-t border-gray-100 animate-slide-up">
            <div className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-6 py-3 font-sans font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-gold-600 bg-gold-50 border-r-4 border-gold-500'
                      : 'text-charcoal-700 hover:text-gold-500 hover:bg-gold-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;