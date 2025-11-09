import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useVote } from '../contexts/VoteContext'

const Home = () => {
  const { totalVotes, totalVotesFemmes, totalVotesHommes } = useVote()

  const stats = [
    { 
      label: 'Total des votes', 
      value: totalVotes.toLocaleString(), 
      color: 'from-purple-500 to-pink-500',
      icon: '📊'
    },
    { 
      label: 'Votes Miss', 
      value: totalVotesFemmes.toLocaleString(), 
      color: 'from-pink-500 to-rose-500',
      icon: '👑'
    },
    { 
      label: 'Votes Mister', 
      value: totalVotesHommes.toLocaleString(), 
      color: 'from-blue-500 to-cyan-500',
      icon: '🤵'
    },
  ]

  const features = [
    {
      icon: '🎯',
      title: 'Votez Facilement',
      description: 'Sélectionnez votre candidat préféré et votez en quelques clics seulement'
    },
    {
      icon: '💳',
      title: 'Paiement Sécurisé',
      description: 'Paiement 100% sécurisé via KkiaPay avec cryptage de bout en bout'
    },
    {
      icon: '⚡',
      title: 'Résultats en Direct',
      description: 'Suivez la progression des votes en temps réel avec des statistiques détaillées'
    },
    {
      icon: '📱',
      title: 'Mobile First',
      description: 'Interface optimisée pour tous vos appareils mobiles et desktop'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-500/10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Miss & Mister
              </span>
              <br />
              <span className="text-3xl md:text-5xl text-gray-700">FSS Médecine 2025</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
            >
              Élisez les ambassadeurs de l'excellence médicale
              <br />
              <span className="text-lg text-gray-500">Chaque vote compte pour soutenir votre candidat préféré</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                to="/vote" 
                className="group relative bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Voter Maintenant</span>
                  <span className="group-hover:translate-x-1 transition-transform">🗳</span>
                </span>
              </Link>
              <Link 
                to="/candidates" 
                className="group bg-white/80 backdrop-blur-sm border-2 border-purple-200 text-purple-700 font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:border-purple-300"
              >
                <span className="flex items-center space-x-2">
                  <span>Découvrir les Candidats</span>
                  <span className="group-hover:scale-110 transition-transform">👑</span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Statistiques en <span className="text-purple-600">Direct</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Suivez l'évolution du concours en temps réel
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-3xl p-8 text-center shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 text-lg font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Pourquoi Voter <span className="text-purple-600">avec Nous</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une expérience de vote moderne, sécurisée et transparente
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-300 group"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à faire gagner votre favori ?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Rejoignez des centaines d'étudiants qui ont déjà voté pour leurs candidats préférés
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/vote"
                className="inline-block bg-white text-purple-600 font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <span className="flex items-center space-x-2">
                  <span>Commencer à Voter</span>
                  <span>🚀</span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home