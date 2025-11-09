import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/Authcontext'

const Header = () => {
  const location = useLocation()
  const { isAdmin, user, logout } = useAuth()

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/candidates', label: 'Candidats' },
    { path: '/vote', label: 'Voter' },
  ]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">FSS</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Miss & Mister Étudiants</h1>
              <p className="text-sm text-gray-600">FSS Médecine Bénin</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {isAdmin && (
              <Link
                to="/admin"
                className={`font-medium transition-all duration-300 ${
                  location.pathname === '/admin'
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-gray-600 hover:text-accent'
                }`}
              >
                Administration
              </Link>
            )}
          </nav>

          {/* Admin Info */}
          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Bonjour, {user?.username}</span>
                <button
                  onClick={logout}
                  className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="text-gray-600 hover:text-primary transition-colors text-sm"
              >
                Espace Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header