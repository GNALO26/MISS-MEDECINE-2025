import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useVote } from '../contexts/VoteContext'
import PaymentModal from '../components/payment/PaymentModal'
import VoteCounter from '../components/payment/VoteCounter'

const Vote = () => {
  const location = useLocation()
  const { candidates } = useVote()
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [voteCount, setVoteCount] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('tous')

  // Candidat présélectionné depuis la page des candidats
  const preselectedCandidate = location.state?.candidate

  const filteredCandidates = selectedCategory === 'tous' 
    ? [...candidates.femmes, ...candidates.hommes]
    : selectedCategory === 'femmes' 
      ? candidates.femmes 
      : candidates.hommes

  const handleVoteClick = (candidate) => {
    setSelectedCandidate(candidate)
    setIsPaymentModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Votez pour votre <span className="text-primary">candidat préféré</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Chaque vote compte ! Soutenez votre candidat avec seulement 100 FCFA par vote.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar avec compteur de votes */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-24 space-y-6">
            <VoteCounter votes={voteCount} onVoteChange={setVoteCount} />
            
            {/* Filtres par catégorie */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Filtrer par catégorie</h3>
              <div className="space-y-2">
                {[
                  { value: 'tous', label: 'Tous les candidats', emoji: '👥' },
                  { value: 'femmes', label: 'Miss seulement', emoji: '👑' },
                  { value: 'hommes', label: 'Mister seulement', emoji: '🤵' }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedCategory(filter.value)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedCategory === filter.value
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{filter.emoji}</span>
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grille des candidats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={candidate.photo}
                    alt={candidate.nom}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {candidate.nom}
                        </h3>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full text-white ${
                          candidate.categorie === 'femmes' ? 'bg-pink-500' : 'bg-blue-500'
                        }`}>
                          {candidate.categorie === 'femmes' ? 'Miss' : 'Mister'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {candidate.description}
                    </p>
                    <button
                      onClick={() => handleVoteClick(candidate)}
                      className="btn-primary w-full"
                    >
                      Voter pour {candidate.nom.split(' ')[0]}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal de paiement */}
      <PaymentModal
        candidate={selectedCandidate}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </div>
  )
}

export default Vote