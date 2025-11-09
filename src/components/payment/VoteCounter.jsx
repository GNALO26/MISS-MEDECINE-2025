import React from 'react'
import { motion } from 'framer-motion'

const VoteCounter = ({ votes, onVoteChange }) => {
  return (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="bg-white rounded-lg p-6 shadow-lg border-2 border-primary/20"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Sélectionnez le nombre de votes
      </h3>
      
      <div className="flex items-center justify-center space-x-4 mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onVoteChange(Math.max(1, votes - 1))}
          className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg hover:shadow-xl transition-all"
        >
          -
        </motion.button>
        
        <motion.span 
          key={votes}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold text-primary min-w-[60px] text-center"
        >
          {votes}
        </motion.span>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onVoteChange(votes + 1)}
          className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg hover:shadow-xl transition-all"
        >
          +
        </motion.button>
      </div>
      
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-800">
          {votes * 100} FCFA
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {votes} vote(s) × 100 FCFA
        </p>
      </div>
    </motion.div>
  )
}

export default VoteCounter