import React, { useState, useMemo } from 'react';
import { useCandidates } from '../hooks/useCandidates';
import CandidateCard from '../components/candidates/CandidateCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Candidates = () => {
  const { candidates, loading, error } = useCandidates();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les candidats
  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      const matchesCategory = activeCategory === 'all' || candidate.categorie === activeCategory;
      const matchesSearch = candidate.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [candidates, activeCategory, searchTerm]);

  const categories = [
    { id: 'all', name: 'Tous les Candidats', count: candidates.length },
    { id: 'Miss', name: 'Miss', count: candidates.filter(c => c.categorie === 'Miss').length },
    { id: 'Mister', name: 'Mister', count: candidates.filter(c => c.categorie === 'Mister').length }
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="font-serif text-2xl text-charcoal-900 mb-2">Erreur de chargement</h2>
          <p className="text-charcoal-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-4">
              Nos Prestigieux Candidats
            </h1>
            <p className="text-xl text-charcoal-600 mb-8">
              Découvrez les 12 candidats en lice pour le titre de Miss & Mister FSS Médecine 2025
            </p>
            
            {/* Barre de recherche */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un candidat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                />
                <svg 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-sans text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gold-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-charcoal-700 border border-gray-300 hover:border-gold-500 hover:text-gold-600'
                  }`}
                >
                  {category.name} 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    activeCategory === category.id
                      ? 'bg-white text-gold-600'
                      : 'bg-gray-100 text-charcoal-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grille des candidats */}
      <section className="py-16">
        <div className="container-custom">
          {/* En-tête résultats */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-serif text-2xl text-charcoal-900">
                {activeCategory === 'all' ? 'Tous les candidats' : 
                 activeCategory === 'Miss' ? 'Candidates Miss' : 'Candidates Mister'}
              </h2>
              <p className="text-charcoal-600">
                {filteredCandidates.length} candidat{filteredCandidates.length > 1 ? 's' : ''} trouvé{filteredCandidates.length > 1 ? 's' : ''}
              </p>
            </div>
            
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-gold-600 hover:text-gold-700 font-sans text-sm font-medium flex items-center"
              >
                Effacer la recherche
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Message si aucun résultat */}
          {filteredCandidates.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-serif text-2xl text-charcoal-900 mb-2">Aucun candidat trouvé</h3>
              <p className="text-charcoal-600 mb-6">
                Aucun candidat ne correspond à votre recherche "{searchTerm}"
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="btn-primary"
              >
                Voir tous les candidats
              </button>
            </div>
          )}

          {/* Grille responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCandidates.map((candidate, index) => (
              <div
                key={candidate.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CandidateCard candidate={candidate} />
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-serif text-3xl text-charcoal-900 mb-4">
              Prêt à soutenir votre favori ?
            </h3>
            <p className="text-charcoal-600 text-lg mb-8 max-w-2xl mx-auto">
              Chaque vote compte ! Soutenez votre candidat préféré en lui offrant vos votes.
            </p>
            <a
              href="/vote"
              className="btn-primary text-lg px-12 py-4"
            >
              Voter Maintenant
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Candidates;