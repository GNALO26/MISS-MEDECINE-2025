import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCandidates } from '../hooks/useCandidates';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCandidateById } = useCandidates();
  
  const { candidate, voteCount, amount } = location.state || {};

  useEffect(() => {
    // Rediriger si pas de données
    if (!candidate || !voteCount) {
      navigate('/candidates');
    }
  }, [candidate, voteCount, navigate]);

  if (!candidate || !voteCount) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="font-serif text-2xl text-charcoal-900 mb-2">
            Données manquantes
          </h2>
          <p className="text-charcoal-600 mb-6">
            Impossible d'afficher la confirmation de vote.
          </p>
          <Link to="/candidates" className="btn-primary">
            Voir les candidats
          </Link>
        </div>
      </div>
    );
  }

  const currentCandidate = getCandidateById(candidate.id) || candidate;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-gold-50 pt-20">
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto">
          {/* Carte de confirmation */}
          <div className="bg-white rounded-2xl shadow-lg border border-gold-200 overflow-hidden">
            {/* En-tête de succès */}
            <div className="bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-12 text-center text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="font-serif text-4xl mb-4">
                Merci pour votre vote !
              </h1>
              <p className="text-gold-100 text-lg">
                Votre soutien a été enregistré avec succès
              </p>
            </div>

            {/* Détails du vote */}
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <img
                    src={currentCandidate.photo}
                    alt={currentCandidate.nom}
                    className="w-full h-full rounded-full object-cover border-4 border-gold-200 shadow-md"
                  />
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    currentCandidate.categorie === 'Miss' ? 'bg-pink-500' : 'bg-blue-500'
                  }`}>
                    {currentCandidate.categorie === 'Miss' ? 'M' : 'Mr'}
                  </div>
                </div>
                
                <h2 className="font-serif text-2xl text-charcoal-900 mb-2">
                  {currentCandidate.nom}
                </h2>
                <p className="text-charcoal-600 mb-4">
                  {currentCandidate.description}
                </p>
                
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                  currentCandidate.categorie === 'Miss' 
                    ? 'bg-pink-100 text-pink-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {currentCandidate.categorie}
                </div>
              </div>

              {/* Résumé de la transaction */}
              <div className="bg-gold-50 rounded-xl p-6 mb-8 border border-gold-200">
                <h3 className="font-serif text-xl text-charcoal-900 mb-4 text-center">
                  Récapitulatif de votre vote
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gold-200">
                    <span className="text-charcoal-600">Nombre de votes</span>
                    <span className="font-sans font-bold text-charcoal-900 text-lg">
                      {voteCount} vote{voteCount > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gold-200">
                    <span className="text-charcoal-600">Montant total</span>
                    <span className="font-sans font-bold text-gold-600 text-lg">
                      {amount?.toLocaleString()} FCFA
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-charcoal-600">Date du vote</span>
                    <span className="font-sans font-medium text-charcoal-700">
                      {new Date().toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/candidates"
                  className="btn-secondary text-center py-3"
                >
                  Voir les autres candidats
                </Link>
                
                <Link
                  to="/vote"
                  className="btn-primary text-center py-3"
                >
                  Voter à nouveau
                </Link>
              </div>

              {/* Partage social */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-center text-charcoal-600 mb-4">
                  Partagez votre soutien sur les réseaux sociaux
                </p>
                
                <div className="flex justify-center space-x-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=Je viens de voter pour ${currentCandidate.nom} pour Miss & Mister FSS Médecine 2025 !`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300"
                  >
                    <span className="text-lg">f</span>
                  </a>
                  
                  <a
                    href={`https://twitter.com/intent/tweet?text=Je viens de voter pour ${currentCandidate.nom} pour Miss & Mister FSS Médecine 2025 !&url=${encodeURIComponent(window.location.origin)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors duration-300"
                  >
                    <span className="text-lg">𝕏</span>
                  </a>
                  
                  <a
                    href={`https://wa.me/?text=Je viens de voter pour ${currentCandidate.nom} pour Miss & Mister FSS Médecine 2025 ! ${encodeURIComponent(window.location.origin)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300"
                  >
                    <span className="text-lg">📱</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section informations supplémentaires */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-serif text-lg text-charcoal-900 mb-2">
                Prochaine étape
              </h3>
              <p className="text-charcoal-600 text-sm">
                La cérémonie de remise des prix aura lieu le 15 Décembre 2025
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-serif text-lg text-charcoal-900 mb-2">
                Résultats en direct
              </h3>
              <p className="text-charcoal-600 text-sm">
                Suivez l'évolution du classement en temps réel
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="font-serif text-lg text-charcoal-900 mb-2">
                Soutien continu
              </h3>
              <p className="text-charcoal-600 text-sm">
                Vous pouvez voter autant de fois que vous le souhaitez
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;