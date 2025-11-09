import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVote } from '../../contexts/VoteContext'
import { VOTE_PRICE } from '../../utils/constants'
import LoadingSpinner from '../common/LoadingSpinner'

const PaymentModal = ({ candidate, voteCount, isOpen, onClose }) => {
  const { handleVote, loading } = useVote()

  if (!isOpen || !candidate) return null

  const totalAmount = voteCount * VOTE_PRICE

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (voteCount > 0) {
      await handleVote(candidate, voteCount)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-lg w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* En-tête */}
          <div className="bg-gold-500 p-6 text-white">
            <h2 className="font-serif text-2xl font-bold text-center">
              Confirmer votre vote
            </h2>
          </div>

          {/* Contenu */}
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={candidate.photo}
                alt={candidate.nom}
                className="w-20 h-20 object-cover rounded-full border-4 border-gold-200"
              />
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-800">
                  {candidate.nom}
                </h3>
                <p className="font-sans text-gray-600 text-sm">
                  {candidate.categorie === 'femmes' ? 'Candidate Miss' : 'Candidate Mister'}
                </p>
              </div>
            </div>

            {/* Détails du vote */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-sans text-gray-600">Nombre de votes:</span>
                <span className="font-sans font-bold text-gray-800">{voteCount}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-sans text-gray-600">Prix par vote:</span>
                <span className="font-sans font-bold text-gray-800">100 FCFA</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="font-sans text-lg font-bold text-gray-800">Total:</span>
                <span className="font-serif text-xl font-bold text-gold-600">
                  {totalAmount.toLocaleString()} FCFA
                </span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 font-sans font-bold transition-all duration-300 hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || voteCount <= 0}
                className="flex-1 btn-elegant flex items-center justify-center space-x-2 disabled:opacity-50"
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

            <p className="text-center text-xs text-gray-500 mt-4">
              Vous serez redirigé vers KkiaPay pour finaliser le paiement
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PaymentModal