import React from 'react'
import { motion } from 'framer-motion'
import { useVote } from '../contexts/VoteContext'
import CandidateCard from '../components/candidates/CandidateCard'

const Candidates = () => {
  const { candidates } = useVote()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">
              LES CANDIDATS 2025
            </h1>
            <div className="w-20 h-1 bg-gold-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 font-sans max-w-2xl mx-auto">
              Découvrez les talents exceptionnels qui représentent l'excellence de la FSS Médecine
            </p>
          </div>
        </div>
      </section>

      {/* Section Miss */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              CANDIDATES MISS
            </h2>
            <div className="w-16 h-1 bg-pink-500 mx-auto"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {candidates.femmes.map((candidate, index) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Mister */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              CANDIDATS MISTER
            </h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {candidates.hommes.map((candidate, index) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Candidates