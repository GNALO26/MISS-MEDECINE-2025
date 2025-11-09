import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useVote } from '../contexts/VoteContext'

const Home = () => {
  const { totalVotes, totalVotesFemmes, totalVotesHommes } = useVote()

  const stats = [
    { label: 'Total des votes', value: totalVotes.toLocaleString(), color: 'text-primary' },
    { label: 'Votes Miss', value: totalVotesFemmes.toLocaleString(), color: 'text-pink-500' },
    { label: 'Votes Mister', value: totalVotesHommes.toLocaleString(), color: 'text-blue-500' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-gray-800 mb-6"
        >
          Concours <span className="text-primary">Miss & Mister</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
        >
          Élisez les ambassadeurs de la Faculté des Sciences de la Santé - Médecine
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/vote" className="btn-primary text-lg px-8 py-4">
            Voter Maintenant 🗳
          </Link>
          <Link to="/candidates" className="btn-secondary text-lg px-8 py-4">
            Découvrir les Candidats
          </Link>
        </motion.div>
      </motion.section>

      {/* Statistics */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className={`text-4xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-gray-600 text-lg">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Features */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {[
          {
            icon: '🎯',
            title: 'Votez Facilement',
            description: 'Sélectionnez votre candidat préféré et votez en quelques clics'
          },
          {
            icon: '💳',
            title: 'Paiement Sécurisé',
            description: 'Paiement 100% sécurisé via KkiaPay avec cryptage SSL'
          },
          {
            icon: '⚡',
            title: 'Résultats en Direct',
            description: 'Suivez la progression des votes en temps réel'
          }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.section>
    </div>
  )
}

export default Home