import React from 'react'
import { Link } from 'react-router-dom'
import { useVote } from '../contexts/VoteContext'

const Home = () => {
  const { totalVotes, totalVotesFemmes, totalVotesHommes } = useVote()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section avec bannière style Miss Lorraine */}
      <section className="relative bg-gradient-to-r from-gold-500 to-gold-600 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              CONCOURS MISS & MISTER
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-8 font-sans">
              FSS Médecine Bénin 2025
            </p>
            <p className="text-xl mb-8 font-sans max-w-2xl mx-auto leading-relaxed">
              Élisez les ambassadeurs de la Faculté des Sciences de la Santé. 
              Votre vote déterminera les prochains Miss et Mister FSS Médecine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/vote" 
                className="bg-white text-gold-600 hover:bg-gray-100 font-sans font-bold text-lg px-8 py-4 rounded-sm transition-colors duration-300 uppercase tracking-wide"
              >
                Voter Maintenant
              </Link>
              <Link 
                to="/candidates" 
                className="border-2 border-white text-white hover:bg-white hover:text-gold-600 font-sans font-bold text-lg px-8 py-4 rounded-sm transition-all duration-300 uppercase tracking-wide"
              >
                Découvrir les Candidats
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              LES CHIFFRES DU CONCOURS
            </h2>
            <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 text-center shadow-sm border border-gray-200">
              <div className="text-4xl font-serif font-bold text-gold-600 mb-2">
                {totalVotes.toLocaleString()}
              </div>
              <div className="text-gray-600 font-sans uppercase tracking-wide text-sm">
                Votes Totaux
              </div>
            </div>
            <div className="bg-white p-8 text-center shadow-sm border border-gray-200">
              <div className="text-4xl font-serif font-bold text-gold-600 mb-2">
                {totalVotesFemmes.toLocaleString()}
              </div>
              <div className="text-gray-600 font-sans uppercase tracking-wide text-sm">
                Votes Miss
              </div>
            </div>
            <div className="bg-white p-8 text-center shadow-sm border border-gray-200">
              <div className="text-4xl font-serif font-bold text-gold-600 mb-2">
                {totalVotesHommes.toLocaleString()}
              </div>
              <div className="text-gray-600 font-sans uppercase tracking-wide text-sm">
                Votes Mister
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Comment Voter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              COMMENT VOTER ?
            </h2>
            <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                Choisissez votre candidat
              </h3>
              <p className="text-gray-600 font-sans">
                Parcourez les profils des candidats et sélectionnez votre favori
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                Sélectionnez le nombre de votes
              </h3>
              <p className="text-gray-600 font-sans">
                Chaque vote coûte 100 FCFA. Vous pouvez voter autant de fois que vous le souhaitez
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                Paiement sécurisé
              </h3>
              <p className="text-gray-600 font-sans">
                Finalisez votre vote par un paiement sécurisé via KkiaPay
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            PRÊT À SOUTENIR VOTRE CANDIDAT ?
          </h2>
          <p className="text-gray-300 mb-8 text-lg font-sans max-w-2xl mx-auto">
            Chaque vote compte et rapproche votre candidat de la victoire. 
            Participez à cette élection exceptionnelle !
          </p>
          <Link
            to="/vote"
            className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-sans font-bold text-lg px-8 py-4 rounded-sm transition-colors duration-300 uppercase tracking-wide"
          >
            Voter Maintenant
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home