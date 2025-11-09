import React from 'react'
import { motion } from 'framer-motion'
import CategorySection from '../components/candidates/CategorySection'

const Candidates = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Nos <span className="text-primary">Candidats</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Découvrez les talents exceptionnels qui représentent l'excellence de la FSS Médecine
        </p>
      </motion.div>

      {/* Section Miss */}
      <CategorySection
        category="femmes"
        title="Candidates Miss"
        description="Découvrez les candidates qui aspirent à devenir la prochaine Miss Étudiante de la FSS Médecine"
      />

      {/* Section Mister */}
      <CategorySection
        category="hommes"
        title="Candidates Mister" 
        description="Rencontrez les candidats qui se présentent pour le titre de Mister Étudiant de la FSS Médecine"
      />

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-20"
      >
        <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à soutenir votre candidat préféré ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Chaque vote compte pour faire gagner votre favori !
          </p>
          <motion.a
            href="/vote"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary font-bold py-4 px-8 rounded-lg text-lg inline-block hover:shadow-xl transition-all"
          >
            Voter Maintenant 🗳
          </motion.a>
        </div>
      </motion.section>
    </div>
  )
}

export default Candidates