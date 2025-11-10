import React from 'react'
import { Link } from 'react-router-dom'
import { useVote } from '../contexts/VoteContext'

const Home = () => {
  const { totalVotes, totalVotesFemmes, totalVotesHommes } = useVote()

  const stats = [
    { 
      label: 'Total des votes', 
      value: totalVotes.toLocaleString(),
      icon: '📊'
    },
    { 
      label: 'Votes Miss', 
      value: totalVotesFemmes.toLocaleString(),
      icon: '👑'
    },
    { 
      label: 'Votes Mister', 
      value: totalVotesHommes.toLocaleString(),
      icon: '🤵'
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center relative bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/images/backgrounds/hero-bg.jpg)'
        }}
      >
        <div className="container text-center text-white">
          <h1 className="font-cursive text-6xl md:text-8xl mb-6 text-gold-300">
            Miss & Mister
          </h1>
          <h2 className="font-serif text-3xl md:text-5xl mb-8">
            FSS Médecine 2025
          </h2>
          <p className="font-sans text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
            L'élection prestigieuse de la Faculté des Sciences de la Santé. 
            Votre vote désignera les prochains ambassadeurs de l'excellence médicale.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/vote" className="btn-primary text-lg px-12 py-4">
              Voter Maintenant
            </Link>
            <Link to="/candidates" className="btn-secondary text-lg px-12 py-4 border-white text-white hover:bg-white hover:text-gold-600">
              Découvrir les Candidats
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="section-title">Statistiques du Concours</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="card p-8 text-center">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-serif font-bold text-gold-600 mb-2">
                  {stat.value}
                </div>
                <div className="font-sans text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="section-title">Comment Voter ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">
                Choisissez votre candidat
              </h3>
              <p className="font-sans text-gray-600">
                Parcourez les profils des candidats et sélectionnez votre favori
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">
                Entrez le nombre de votes
              </h3>
              <p className="font-sans text-gray-600">
                Chaque vote coûte 100 FCFA. Aucune limite de votes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">
                Paiement sécurisé
              </h3>
              <p className="font-sans text-gray-600">
                Finalisez votre vote par un paiement sécurisé via KkiaPay
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gold-500">
        <div className="container text-center text-white">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Prêt à Soutenir votre Favori ?
          </h2>
          <p className="font-sans text-xl mb-8 max-w-2xl mx-auto">
            Chaque vote compte et rapproche votre candidat de la victoire. 
            Participez à cette élection exceptionnelle !
          </p>
          <Link
            to="/vote"
            className="inline-block bg-white text-gold-600 hover:bg-gray-100 font-sans font-bold text-lg px-12 py-4 transition-colors duration-300 uppercase tracking-wider"
          >
            Voter Maintenant
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home