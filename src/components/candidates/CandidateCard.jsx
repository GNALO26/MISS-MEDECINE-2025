import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { APP_CONFIG } from '../../utils/supabase'

const CandidateCard = ({ candidate, index }) => {
  const { isAdmin } = useAuth()
  
  const isResultsHidden = new Date() > new Date(APP_CONFIG.CONTEST_DATES.resultsHiddenAfter)

  return (
    <div className="card overflow-hidden group">
      {/* Photo */}
      <div className="relative overflow-hidden">
        <img
          src={candidate.photo}
          alt={candidate.nom}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-sm font-sans font-bold text-white ${
            candidate.categorie === 'femmes' ? 'bg-pink-500' : 'bg-blue-500'
          }`}>
            {candidate.categorie === 'femmes' ? 'MISS' : 'MISTER'}
          </span>
        </div>
      </div>

      {/* Informations */}
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold text-gray-800 mb-2 text-center">
          {candidate.nom}
        </h3>
        <p className="font-sans text-gray-600 text-center mb-4 leading-relaxed">
          {candidate.description}
        </p>
        
        {/* Votes */}
        {(isAdmin || !isResultsHidden) && (
          <div className="text-center mb-4">
            <div className="font-sans text-sm text-gray-500 mb-1">
              Votes actuels
            </div>
            <div className="font-serif text-2xl font-bold text-gold-600">
              {candidate.votes.toLocaleString()}
            </div>
          </div>
        )}

        {/* Bouton */}
        <Link
          to="/vote"
          state={{ candidate }}
          className="block w-full btn-primary text-center"
        >
          Voter pour {candidate.nom.split(' ')[0]}
        </Link>
      </div>
    </div>
  )
}

export default CandidateCard