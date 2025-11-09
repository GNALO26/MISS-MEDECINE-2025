import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useVote } from '../contexts/VoteContext'

const Home = () => {
  const { totalVotes, totalVotesFemmes, totalVotesHommes } = useVote()
  const [currentImage, setCurrentImage] = useState(0)
  const controls = useAnimation()
  const [ref, inView] = useInView()

  const backgroundImages = [
    '/images/backgrounds/hero-1.jpg',
    '/images/backgrounds/hero-2.jpg',
    '/images/backgrounds/hero-3.jpg'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const stats = [
    { 
      label: 'Votes Totaux', 
      value: totalVotes, 
      suffix: '',
      color: 'from-gold-500 to-yellow-300'
    },
    { 
      label: 'Candidates Miss', 
      value: totalVotesFemmes, 
      suffix: 'votes',
      color: 'from-pink-500 to-rose-400'
    },
    { 
      label: 'Candidates Mister', 
      value: totalVotesHommes, 
      suffix: 'votes',
      color: 'from-blue-500 to-cyan-400'
    },
  ]

  const features = [
    {
      icon: '👑',
      title: 'Concours Prestigieux',
      description: 'Participez à l\'élection la plus attendue de la FSS Médecine'
    },
    {
      icon: '💝',
      title: 'Soutenez vos Favoris',
      description: 'Chaque vote compte pour faire gagner votre candidat préféré'
    },
    {
      icon: '🔒',
      title: 'Paiement Sécurisé',
      description: 'Transaction 100% sécurisée via KkiaPay'
    },
    {
      icon: '⚡',
      title: 'Résultats en Direct',
      description: 'Suivez l\'évolution du classement en temps réel'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section avec Slider */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        {backgroundImages.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImage === index ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        
        {/* Overlay élégant */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        
        {/* Contenu Hero */}
        <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1 
              className="font-cursive text-6xl md:text-8xl mb-4 text-shadow"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Miss & Mister
            </motion.h1>
            
            <motion.h2 
              className="font-serif text-3xl md:text-5xl mb-8 text-shadow-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              FSS Médecine 2025
            </motion.h2>
            
            <motion.p 
              className="font-sans text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-shadow-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              L'élection la plus prestigieuse de la Faculté des Sciences de la Santé. 
              Votre vote désignera les prochains ambassadeurs de l'excellence médicale.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <Link 
                to="/vote" 
                className="btn-elegant text-lg px-12 py-5 animate-pulse-gold"
              >
                Voter Maintenant
              </Link>
              <Link 
                to="/candidates" 
                className="btn-secondary text-lg px-12 py-5 border-white text-white hover:bg-white hover:text-gold-500"
              >
                Découvrir les Candidats
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-elegant-pattern bg-[length:20px_20px] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              Le Concours en Chiffres
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="font-sans text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Des chiffres qui témoignent de l'engouement pour cette élection prestigieuse
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -10
                }}
                className="card-elegant p-8 text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className={`text-5xl font-serif font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-4`}>
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="font-sans text-gray-600 uppercase tracking-wider text-sm font-semibold">
                    {stat.label}
                  </div>
                  {stat.suffix && (
                    <div className="text-gray-500 text-sm mt-2">
                      {stat.suffix}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              Pourquoi Participer ?
            </h2>
            <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
              Une expérience de vote unique, sécurisée et mémorable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
                className="card-elegant p-8 text-center group"
              >
                <motion.div 
                  className="text-5xl mb-6 animate-float"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 text-shadow">
              Prêt à Écrire l'Histoire ?
            </h2>
            <p className="font-sans text-xl text-gold-100 mb-8 max-w-2xl mx-auto text-shadow-light">
              Rejoignez les centaines de personnes qui ont déjà choisi leurs favoris. 
              Votre vote peut faire la différence !
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/vote"
                className="inline-block bg-white text-gold-600 hover:bg-gray-100 font-sans font-bold text-lg px-12 py-5 transition-all duration-300 uppercase tracking-wider shadow-2xl hover:shadow-3xl"
              >
                Voter Maintenant
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home