import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useVote } from '../../contexts/VoteContext';
import ProgressBar from './ProgressBar';

const CandidateCard = ({ candidate }) => {
  const { stats, lastUpdate } = useVote();
  const [localVotes, setLocalVotes] = useState(candidate.votes || 0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Mettre à jour les votes locaux quand le candidat change
  useEffect(() => {
    setLocalVotes(candidate.votes || 0);
  }, [candidate.votes]);

  // Animation de mise à jour
  useEffect(() => {
    if (candidate.votes !== localVotes) {
      setIsUpdating(true);
      const timer = setTimeout(() => {
        setLocalVotes(candidate.votes || 0);
        setIsUpdating(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [candidate.votes, localVotes]);

  const percentage = stats.totalVotes > 0 ? (localVotes / stats.totalVotes) * 100 : 0;

  return (
    <div className="card-elegant candidate-card overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={candidate.photo}
          alt={candidate.nom}
          className="responsive-image h-80 w-full group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badge de mise à jour en temps réel */}
        {isUpdating && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              🔄
            </div>
          </div>
        )}

        {/* Badge catégorie */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
          candidate.categorie === 'Miss' 
            ? 'bg-pink-500 text-white' 
            : 'bg-blue-500 text-white'
        }`}>
          {candidate.categorie}
        </div>

        {/* Indicateur de votes en temps réel */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
            <span className={isUpdating ? 'animate-pulse' : ''}>
              {localVotes.toLocaleString()} votes
            </span>
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

        {/* Barre de progression avec animation */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-charcoal-500 mb-2">
            <span className={isUpdating ? 'animate-pulse font-bold' : ''}>
              {localVotes.toLocaleString()} votes
            </span>
            <span className={isUpdating ? 'animate-pulse font-bold text-gold-600' : ''}>
              {percentage.toFixed(1)}%
            </span>
          </div>
          <ProgressBar 
            progress={percentage} 
            height="h-3"
            animate={true}
          />
        </div>

        {/* Bouton voter */}
        <Link
          to={`/vote?candidate=${candidate.id}`}
          className="btn-primary w-full text-center justify-center inline-flex items-center text-sm py-2.5 transform transition-transform duration-300 hover:scale-105"
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