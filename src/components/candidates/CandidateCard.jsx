import React from 'react';
import { Link } from 'react-router-dom';

const CandidateCard = ({ candidate }) => {
  const totalVotes = 1500; // À remplacer par les données réelles
  const percentage = candidate.votes ? (candidate.votes / totalVotes) * 100 : 0;

  return (
    <div className="card-elegant candidate-card overflow-hidden group">
      {/* Image avec overlay */}
      <div className="relative overflow-hidden">
        <img
          src={candidate.photo}
          alt={candidate.nom}
          className="responsive-image h-80 w-full group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay élégant */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge catégorie */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
          candidate.categorie === 'Miss' 
            ? 'bg-pink-500 text-white' 
            : 'bg-blue-500 text-white'
        }`}>
          {candidate.categorie}
        </div>

        {/* Info overlay au hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm leading-relaxed line-clamp-2">
              {candidate.description}
            </p>
          </div>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="p-6">
        <h3 className="font-serif text-xl text-charcoal-900 mb-2 group-hover:text-gold-600 transition-colors duration-300">
          {candidate.nom}
        </h3>
        
        <p className="text-charcoal-600 text-sm mb-4 line-clamp-2">
          {candidate.description}
        </p>

        {/* Barre de progression */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-charcoal-500 mb-2">
            <span>{candidate.votes?.toLocaleString() || 0} votes</span>
            <span>{percentage.toFixed(1)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Bouton voter */}
        <Link
          to={`/vote?candidate=${candidate.id}`}
          className="btn-primary w-full text-center justify-center inline-flex items-center text-sm py-2.5"
        >
          <span>Voter pour {candidate.nom.split(' ')[0]}</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CandidateCard;