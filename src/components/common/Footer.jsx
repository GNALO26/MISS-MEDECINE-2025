import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Informations */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Concours Miss & Mister</h3>
            <p className="text-gray-300 font-sans mb-4">
              Faculté des Sciences de la Santé - Médecine<br />
              Université d'Abomey-Calavi, Bénin
            </p>
          </div>
          
          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 font-sans text-gray-300">
              <li><Link to="/" className="hover:text-gold-500 transition-colors">Accueil</Link></li>
              <li><Link to="/candidates" className="hover:text-gold-500 transition-colors">Les Candidats</Link></li>
              <li><Link to="/vote" className="hover:text-gold-500 transition-colors">Voter</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Contact</h3>
            <ul className="space-y-2 font-sans text-gray-300">
              <li>Email: contact@-miss_mister-fss-medecine.bj</li>
              <li>Tél: +229 01 56 03 58 88</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 font-sans text-sm">
            © 2025 FSS Médecine Bénin - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer