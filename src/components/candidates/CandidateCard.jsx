import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { APP_CONFIG } from '../../utils/supabase'
import ImageWithFallback from '../common/ImageWithFallback'

const CandidateCard = ({ candidate, totalVotesInCategory, index }) => {
  const { isAdmin } = useAuth()
  
  const isResultsHidden = new Date() > new Date(APP_CONFIG.CONTEST_DATES.resultsHiddenAfter)
  const percentage = totalVotesInCategory > 0 ? (candidate.votes / totalVotesInCategory) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="card overflow-hidden group"
    >
      {/* Photo du candidat avec fallback */}
      <div className="relative overflow-hidden h-80">
        <ImageWithFallback 
          src={candidate.photo}
          alt={`Photo de ${candidate.nom}`}
          className="w-full h-full group-hover:scale-110 transition-transform duration-500"
          fallbackSrc="/images/candidates/default-avatar.jpg"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Badge de catégorie */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${
          candidate.categorie === 'femmes' ? 'bg-pink-500' : 'bg-blue-500'
        }`}>
          {candidate.categorie === 'femmes' ? 'Miss' : 'Mister'}
        </div>
      </div>

      {/* Informations */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{candidate.nom}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{candidate.description}</p>
        
        {/* Barre de progression */}
        {(isAdmin || !isResultsHidden) && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Votes: {candidate.votes.toLocaleString()}</span>
              {isAdmin && <span>{percentage.toFixed(1)}%</span>}
            </div>
            <div className="bg-gray-200 rounded-full h-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}% `}}
                transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                className={`h-3 rounded-full ${
                  candidate.categorie === 'femmes' ? 'bg-pink-500' : 'bg-blue-500'
                }`}
              />
            </div>
          </div>
        )}

        {/* Bouton de vote */}
        <Link
          to="/vote"
          state={{ candidate }}
          className="btn-primary w-full text-center block"
        >
          Voter pour {candidate.nom.split(' ')[0]}
        </Link>
      </div>
    </motion.div>
  )
}

export default CandidateCard