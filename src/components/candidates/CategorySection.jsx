import React from 'react'
import { motion } from 'framer-motion'
import CandidateCard from './CandidateCard'
import { useVote } from '../../contexts/VoteContext'

const CategorySection = ({ category, title, description }) => {
  const { candidates, totalVotesFemmes, totalVotesHommes } = useVote()
  
  const totalVotesInCategory = category === 'femmes' ? totalVotesFemmes : totalVotesHommes

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-16"
    >
      {/* En-tête de section */}
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold text-gray-800 mb-4"
        >
          {title}
        </motion.h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          {description}
        </p>
        <div className="bg-white rounded-lg py-3 px-6 inline-block shadow-md">
          <span className="text-2xl font-bold text-primary">
            {totalVotesInCategory.toLocaleString()} votes
          </span>
          <span className="text-gray-600 ml-2">au total</span>
        </div>
      </div>

      {/* Grille des candidats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {candidates[category].map((candidate, index) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            totalVotesInCategory={totalVotesInCategory}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  )
}

export default CategorySection