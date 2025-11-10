import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const location = useLocation()
  const { isAdmin, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

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
    <header className={`header-fixed transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center shadow-lg border-2 border-gold-300">
              <span className="text-white font-serif font-bold text-xl">FSS</span>
            </div>
            <div className="hidden md:block">
              <h1 className="font-serif text-2xl font-bold text-gray-800">Miss & Mister</h1>
              <p className="font-sans text-sm text-gray-600">FSS Médecine 2025</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-sans font-medium text-lg transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-gold-600 border-b-2 border-gold-600'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-gold-600' 
                      : 'text-white hover:text-gold-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {isAdmin && (
              <Link
                to="/admin"
                className={`font-sans font-medium text-lg transition-colors duration-300 ${
                  location.pathname === '/admin'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-blue-600' 
                      : 'text-white hover:text-blue-300'
                }`}
              >
                Administration
              </Link>
            )}
          </nav>

          {/* Admin et Menu Mobile */}
          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={logout}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-sans transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="hidden md:block text-gray-600 hover:text-gold-600 transition-colors text-sm font-sans"
              >
                Admin
              </Link>
            )}

            {/* Menu Mobile Button */}
            <button className="md:hidden text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header