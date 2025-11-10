import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useVote } from '../contexts/VoteContext'
import PaymentModal from '../components/payment/PaymentModal'

const Vote = () => {
  const location = useLocation()
  const { candidates } = useVote()
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [voteCount, setVoteCount] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('tous')

  const preselectedCandidate = location.state?.candidate

  const filteredCandidates = selectedCategory === 'tous' 
    ? [...candidates.femmes, ...candidates.hommes]
    : selectedCategory === 'femmes' 
      ? candidates.femmes 
      : candidates.hommes

  const handleVoteClick = (candidate) => {
    if (voteCount <= 0) {
      alert('Veuillez entrer un nombre de votes valide (minimum 1)')
      return
    }
    setSelectedCandidate(candidate)
    setIsPaymentModalOpen(true)
  }

  const handleVoteCountChange = (e) => {
    const value = parseInt(e.target.value) || 0
    setVoteCount(Math.max(0, value))
  }

  const categories = [
    { value: 'tous', label: 'Tous les Candidats', count: candidates.femmes.length + candidates.hommes.length },
    { value: 'femmes', label: 'Candidates Miss', count: candidates.femmes.length },
    { value: 'hommes', label: 'Candidates Mister', count: candidates.hommes.length },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container py-12">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="section-title">Votez pour votre Favori</h1>
          <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
            Chaque vote compte ! Soutenez votre candidat préféré et aidez-le à remporter cette élection prestigieuse.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sélecteur de votes */}
            <div className="card p-6">
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">
                Nombre de Votes
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-sans text-sm font-medium text-gray-700 mb-2">
                    Entrez le nombre de votes
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={voteCount}
                    onChange={handleVoteCountChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-300 text-center font-sans text-lg font-bold"
                    placeholder="0"
                  />
                </div>
                <div className="text-center">
                  <p className="font-sans text-2xl font-bold text-gold-600">
                    {voteCount * 100} FCFA
                  </p>
                  <p className="text-sm text-gray-600">
                    {voteCount} vote(s) × 100 FCFA
                  </p>
                </div>
              </div>
            </div>

            {/* Filtres */}
            <div className="card p-6">
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">
                Filtrer par Catégorie
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full text-left p-3 transition-all duration-300 border-l-4 ${
                      selectedCategory === category.value
                        ? 'bg-gold-50 border-gold-500 text-gold-700'
                        : 'border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-sans">{category.label}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedCategory === category.value
                          ? 'bg-gold-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grille des candidats */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCandidates.map((candidate, index) => (
                <div key={candidate.id} className="card overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={candidate.photo}
                      alt={candidate.nom}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-xs font-sans font-bold text-white ${
                        candidate.categorie === 'femmes' ? 'bg-pink-500' : 'bg-blue-500'
                      }`}>
                        {candidate.categorie === 'femmes' ? 'MISS' : 'MISTER'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-gray-800 mb-2 text-center">
                      {candidate.nom}
                    </h3>
                    <p className="font-sans text-gray-600 text-center mb-4 leading-relaxed">
                      {candidate.description}
                    </p>
                    
                    <div className="text-center mb-4">
                      <div className="font-sans text-sm text-gray-500 mb-1">
                        Votes actuels
                      </div>
                      <div className="font-serif text-2xl font-bold text-gold-600">
                        {candidate.votes.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => handleVoteClick(candidate)}
                      disabled={voteCount <= 0}
                      className={`w-full py-3 font-sans font-bold transition-all duration-300 uppercase tracking-wider text-sm ${
                        voteCount <= 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'btn-primary'
                      }`}
                    >
                      Voter pour {candidate.nom.split(' ')[0]}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de paiement */}
      <PaymentModal
        candidate={selectedCandidate}
        voteCount={voteCount}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </div>
  )
}

export default Vote