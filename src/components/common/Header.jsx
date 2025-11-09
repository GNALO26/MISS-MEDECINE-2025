import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const location = useLocation()
  const { isAdmin, user, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/candidates', label: 'Les Candidats' },
    { path: '/vote', label: 'Voter' },
  ]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-2xl py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo Élégant */}
          <Link to="/" className="flex items-center space-x-4 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gold-500 border-gold-400 shadow-lg' 
                  : 'bg-white/20 backdrop-blur-sm border-white/30'
              }`}
            >
              <span className={`font-serif font-bold text-xl transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-gold-600'
              }`}>
                FSS
              </span>
            </motion.div>
            <div className={`transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-90'}`}>
              <h1 className={`font-serif text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                Miss & Mister
              </h1>
              <p className={`font-sans text-sm transition-colors duration-300 ${
                isScrolled ? 'text-gray-600' : 'text-white/80'
              }`}>
                FSS Médecine 2025
              </p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-sans font-medium text-lg transition-all duration-300 relative py-2 ${
                  location.pathname === item.path
                    ? 'text-gold-500'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-gold-500' 
                      : 'text-white hover:text-gold-300'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"
                  />
                )}
              </Link>
            ))}
            
            {isAdmin && (
              <Link
                to="/admin"
                className={`font-sans font-medium text-lg transition-all duration-300 relative py-2 ${
                  location.pathname === '/admin'
                    ? 'text-blue-500'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-blue-500' 
                      : 'text-white hover:text-blue-300'
                }`}
              >
                Administration
                {location.pathname === '/admin' && (
                  <motion.div
                    layoutId="navbar-admin"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  />
                )}
              </Link>
            )}
          </nav>

          {/* CTA et Menu Mobile */}
          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <div className="hidden md:flex items-center space-x-4">
                <span className={`font-sans text-sm transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600' : 'text-white'
                }`}>
                  Admin
                </span>
                <button
                  onClick={logout}
                  className="btn-secondary py-2 px-4 text-sm"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className={`hidden md:block font-sans text-sm transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600 hover:text-gold-500' : 'text-white hover:text-gold-300'
                }`}
              >
                Administration
              </Link>
            )}

            {/* Menu Mobile Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden flex flex-col space-y-1 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <span className={`w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-gold-500' : 'bg-current'
              }`}></span>
              <span className={`w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'bg-current'
              }`}></span>
              <span className={`w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-gold-500' : 'bg-current'
              }`}></span>
            </motion.button>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-md rounded-lg shadow-2xl mt-4 overflow-hidden"
            >
              <nav className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-6 py-3 font-sans text-lg transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-gold-500 text-white'
                        : 'text-gray-700 hover:bg-gold-50 hover:text-gold-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-6 py-3 font-sans text-lg transition-all duration-300 ${
                      location.pathname === '/admin'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    Administration
                  </Link>
                )}

                {isAdmin && (
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-6 py-3 font-sans text-lg text-red-600 hover:bg-red-50 transition-all duration-300"
                  >
                    Déconnexion
                  </button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header