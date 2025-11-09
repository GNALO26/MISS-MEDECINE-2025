import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-purple-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">FSS</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Miss & Mister Étudiants</h3>
                <p className="text-purple-200">FSS Médecine Bénin</p>
              </div>
            </Link>
            <p className="text-purple-200 leading-relaxed max-w-md">
              Élisez les ambassadeurs de l'excellence médicale. Participez au concours le plus prestigieux de la Faculté des Sciences de la Santé.
            </p>
          </div>
          
          {/* Liens rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-purple-200 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/candidates" className="text-purple-200 hover:text-white transition-colors">Candidats</Link></li>
              <li><Link to="/vote" className="text-purple-200 hover:text-white transition-colors">Voter</Link></li>
              <li><Link to="/admin" className="text-purple-200 hover:text-white transition-colors">Administration</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-purple-200">
              <li className="flex items-center space-x-2">
                <span>📧</span>
                <span>contact@miss_mister-fss-medecine.bj</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <span>+229 01 56 03 58 88</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🏥</span>
                <span>FSS Médecine, UAC Bénin</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-purple-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-300 text-sm mb-4 md:mb-0">
            © 2025 FSS Médecine Bénin. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-purple-300 text-sm">
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer