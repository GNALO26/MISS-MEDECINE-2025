import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex flex-col items-start">
              <span className="typography-cursive text-3xl text-gold-500 mb-2">
                Miss & Mister
              </span>
              <span className="font-sans text-sm font-bold tracking-widest text-gray-300 uppercase mb-4">
                FSS Médecine 2025
              </span>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Concours officiel Miss & Mister de la Faculté des Sciences de la Santé. 
                Votez pour vos candidats préférés et participez à cet événement prestigieux.
              </p>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-serif text-lg text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-gold-400 transition-colors duration-300 text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/candidates" className="text-gray-400 hover:text-gold-400 transition-colors duration-300 text-sm">
                  Candidats
                </Link>
              </li>
              <li>
                <Link to="/vote" className="text-gray-400 hover:text-gold-400 transition-colors duration-300 text-sm">
                  Voter
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-400 hover:text-gold-400 transition-colors duration-300 text-sm">
                  Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg text-white mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Faculté des Sciences de la Santé</p>
              <p>Université du Bénin</p>
              <p>contact@miss_mister-fss-medecine.bj</p>
              <p>+229 01 56 03 58 88</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-charcoal-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Miss & Mister FSS Médecine. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-300 text-sm">
              Confidentialité
            </a>
            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors duration-300 text-sm">
              Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;