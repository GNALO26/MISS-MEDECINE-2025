import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const location = useLocation()
  const { isAdmin, user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Accueil', icon: '🏠' },
    { path: '/candidates', label: 'Candidats', icon: '👑' },
    { path: '/vote', label: 'Voter', icon: '🗳' },
  ]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-xl">FSS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Miss & Mister
              </h1>
              <p className="text-sm text-gray-600">FSS Médecine Bénin</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            
            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  location.pathname === '/admin'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span>⚙</span>
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* Admin Info & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Bonjour, {user?.email}</p>
                  <p className="text-xs text-green-600">Administrateur</p>
                </div>
                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="hidden md:block text-gray-600 hover:text-purple-600 transition-colors text-sm bg-gray-100 px-4 py-2 rounded-full"
              >
                Espace Admin
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
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
              className="md:hidden bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
              <nav className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-6 py-4 text-lg font-medium transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
                
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-6 py-4 text-lg font-medium transition-all duration-300 ${
                      location.pathname === '/admin'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">⚙</span>
                    <span>Administration</span>
                  </Link>
                )}

                {isAdmin ? (
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center space-x-3 px-6 py-4 text-lg font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
                  >
                    <span className="text-xl">🚪</span>
                    <span>Déconnexion</span>
                  </button>
                ) : (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-6 py-4 text-lg font-medium text-gray-600 hover:bg-gray-50 transition-all duration-300"
                  >
                    <span className="text-xl">🔐</span>
                    <span>Espace Admin</span>
                  </Link>
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