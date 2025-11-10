import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Miss & Mister FSS Médecine</h3>
            <p className="font-sans text-gray-300">
              Concours prestigieux de la Faculté des Sciences de la Santé, 
              Université d'Abomey-Calavi, Bénin
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 font-sans text-gray-300">
              <li><Link to="/" className="hover:text-gold-400 transition-colors">Accueil</Link></li>
              <li><Link to="/candidates" className="hover:text-gold-400 transition-colors">Les Candidats</Link></li>
              <li><Link to="/vote" className="hover:text-gold-400 transition-colors">Voter</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 font-sans text-gray-300">
              <li>Email: contact@fss-medecine.bj</li>
              <li>Téléphone: +229 XX XX XX XX</li>
              <li>FSS Médecine, UAC Bénin</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="font-sans text-gray-400 text-sm">
            © 2025 FSS Médecine Bénin - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer