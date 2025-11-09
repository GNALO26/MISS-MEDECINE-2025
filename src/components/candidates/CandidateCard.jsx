import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { APP_CONFIG } from '../../utils/supabase'
import ImageWithFallback from '../common/ImageWithFallback'

const CandidateCard = ({ candidate, index }) => {
  const { isAdmin } = useAuth()
  
  const isResultsHidden = new Date() > new Date(APP_CONFIG.CONTEST_DATES.resultsHiddenAfter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group"
    >
      {/* Photo du candidat */}
      <div className="relative overflow-hidden bg-gray-200">
        <ImageWithFallback 
          src={candidate.photo}
          alt={`Photo de ${candidate.nom}`}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
          fallbackSrc="/images/candidates/default-avatar.jpg"
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
        <h3 className="text-xl font-serif font-bold text-gray-800 mb-2 text-center">
          {candidate.nom}
        </h3>
        <p className="text-gray-600 mb-4 text-center font-sans leading-relaxed">
          {candidate.description}
        </p>
        
        {/* Barre de progression (seulement pour admin ou avant la date limite) */}
        {(isAdmin || !isResultsHidden) && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1 font-sans">
              <span>{candidate.votes.toLocaleString()} votes</span>
              {isAdmin && (
                <span>
                  {candidatesTotal > 0 ? ((candidate.votes / candidatesTotal) * 100).toFixed(1) : 0}%
                </span>
              )}
            </div>
            <div className="bg-gray-200 h-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width:`${candidatesTotal > 0 ? (candidate.votes / candidatesTotal) * 100 : 0}%`}}
                transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                className={`h-2 ${
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
          className="block w-full bg-gold-500 hover:bg-gold-600 text-white font-sans font-bold py-3 text-center transition-colors duration-300 uppercase tracking-wide text-sm"
        >
          Voter pour {candidate.nom.split(' ')[0]}
        </Link>
      </div>
    </motion.div>
  )
}

export default CandidateCard