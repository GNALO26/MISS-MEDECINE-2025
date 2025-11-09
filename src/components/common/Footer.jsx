import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informations */}
          <div>
            <h3 className="text-lg font-bold mb-4">Concours Miss & Mister Étudiants</h3>
            <p className="text-gray-300">
              Faculté des Sciences de la Santé - Médecine<br />
              Université d'Abomey-Calavi, Bénin
            </p>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-300">
              Email: contact@fss-missmedecine.bj<br />
              Tél: +229 01 56 03 58 88
            </p>
          </div>
          
          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/candidates" className="hover:text-primary transition-colors">Voir les candidats</a></li>
              <li><a href="/vote" className="hover:text-primary transition-colors">Voter maintenant</a></li>
              <li><a href="/admin" className="hover:text-primary transition-colors">Espace administration</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 FSS Médecine Bénin - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer