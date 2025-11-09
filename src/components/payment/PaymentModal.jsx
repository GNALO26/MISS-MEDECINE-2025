import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVote } from '../../contexts/VoteContext'
import { VOTE_PRICE } from '../../utils/constants'
import LoadingSpinner from '../common/LoadingSpinner'

const PaymentModal = ({ candidate, isOpen, onClose }) => {
  const { handleVote, loading } = useVote()
  const [voteCount, setVoteCount] = useState(1)

  if (!isOpen) return null

  const totalAmount = voteCount * VOTE_PRICE

  const handleSubmit = (e) => {
    e.preventDefault()
    handleVote(candidate, voteCount)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Voter pour {candidate.nom}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo et informations */}
            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <img
                src={candidate.photo}
                alt={candidate.nom}
                className="w-16 h-16 object-cover rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{candidate.nom}</h3>
                <p className="text-sm text-gray-600">{candidate.description}</p>
              </div>
            </div>

            {/* Sélection du nombre de votes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de votes
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setVoteCount(Math.max(1, voteCount - 1))}
                  className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xl font-bold hover:bg-gray-300 transition-colors"
                >
                  -
                </button>
                
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={voteCount}
                  onChange={(e) => setVoteCount(parseInt(e.target.value) || 1)}
                  className="flex-1 h-12 border border-gray-300 rounded-lg text-center text-xl font-bold focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                
                <button
                  type="button"
                  onClick={() => setVoteCount(voteCount + 1)}
                  className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xl font-bold hover:bg-gray-300 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Résumé du coût */}
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-700">{voteCount} vote(s) × 100 FCFA</span>
                <span className="font-bold text-primary text-xl">
                  {totalAmount.toLocaleString()} FCFA
                </span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="small" />
                    <span>Traitement...</span>
                  </>
                ) : (
                  <>
                    <span>Payer avec KkiaPay</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-sm text-gray-500">
              Vous serez redirigé vers KkiaPay pour finaliser le paiement
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PaymentModal