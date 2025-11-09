import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const location = useLocation()
  const { isAdmin, user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/candidates', label: 'Les Candidats' },
    { path: '/vote', label: 'Voter' },
  ]

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center shadow-lg border-2 border-gold-300">
              <span className="text-white font-bold text-xl">FSS</span>
            </div>
            <div className="hidden md:block text-center">
              <h1 className="text-2xl font-serif font-bold text-gray-800">Miss & Mister</h1>
              <p className="text-sm text-gray-600 font-sans">FSS Médecine Bénin 2025</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-sans font-medium text-lg transition-all duration-300 border-b-2 pb-1 ${
                  location.pathname === item.path
                    ? 'text-gold-600 border-gold-600'
                    : 'text-gray-700 border-transparent hover:text-gold-600 hover:border-gold-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {isAdmin && (
              <Link
                to="/admin"
                className={`font-sans font-medium text-lg transition-all duration-300 border-b-2 pb-1 ${
                  location.pathname === '/admin'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-400'
                }`}
              >
                Administration
              </Link>
            )}
          </nav>

          {/* Admin Info & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-gray-600">Connecté en tant qu'admin</span>
                <button
                  onClick={logout}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="hidden md:block text-gray-600 hover:text-gold-600 transition-colors text-sm"
              >
                Admin
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-gold-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <nav className="py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block font-sans font-medium text-lg transition-colors ${
                      location.pathname === item.path
                        ? 'text-gold-600'
                        : 'text-gray-700 hover:text-gold-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-sans font-medium text-lg text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Administration
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header