import React from 'react'
import { useVote } from '../contexts/VoteContext'
import CandidateCard from '../components/candidates/CandidateCard'

const Candidates = () => {
  const { candidates } = useVote()

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container py-12">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="section-title">Les Candidats 2025</h1>
          <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les talents exceptionnels qui représentent l'excellence de la FSS Médecine
          </p>
        </div>

        {/* Section Miss */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-gray-800 mb-4">Candidates Miss</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates.femmes.map((candidate, index) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Section Mister */}
        <section>
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-gray-800 mb-4">Candidates Mister</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates.hommes.map((candidate, index) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                index={index}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Candidates