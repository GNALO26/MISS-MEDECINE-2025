import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useVote } from '../contexts/VoteContext'
import { CONTEST_DATES } from '../utils/constants'

const Admin = () => {
  const { isAdmin, login, user } = useAuth()
  const { candidates, votes, totalVotes, totalVotesFemmes, totalVotesHommes } = useVote()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('statistiques')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!login(username, password)) {
      alert('Identifiants incorrects')
    }
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Connexion Administration
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    )
  }

  const allCandidates = [...candidates.femmes, ...candidates.hommes]
  const sortedCandidates = [...allCandidates].sort((a, b) => b.votes - a.votes)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête Admin */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Tableau de Bord Administrateur
            </h1>
            <p className="text-gray-600">
              Connecté en tant que <strong>{user?.username}</strong>
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              {totalVotes.toLocaleString()} votes
            </p>
            <p className="text-gray-600">Total des votes</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation par onglets */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'statistiques', label: 'Statistiques' },
              { id: 'candidats', label: 'Classement Candidats' },
              { id: 'transactions', label: 'Transactions' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenu des onglets */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {activeTab === 'statistiques' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Cartes de statistiques */}
            {[
              { label: 'Total Votes', value: totalVotes, color: 'bg-blue-500' },
              { label: 'Votes Miss', value: totalVotesFemmes, color: 'bg-pink-500' },
              { label: 'Votes Mister', value: totalVotesHommes, color: 'bg-indigo-500' },
              { label: 'Recettes Totales', value: totalVotes * 100, color: 'bg-green-500', suffix: ' FCFA' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mr-4`}>
                    <span className="text-white text-2xl">📊</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {stat.value.toLocaleString()}{stat.suffix || ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'candidats' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Classement des Candidats
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Catégorie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Votes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pourcentage
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedCandidates.map((candidate, index) => {
                    const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0
                    return (
                      <tr key={candidate.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`w-8 h-8 flex items-center justify-center rounded-full ${
                              index === 0 ? 'bg-yellow-100 text-yellow-800' :
                              index === 1 ? 'bg-gray-100 text-gray-800' :
                              index === 2 ? 'bg-orange-100 text-orange-800' :
                              'bg-blue-100 text-blue-800'
                            } font-bold`}>
                              {index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={candidate.photo}
                              alt={candidate.nom}
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {candidate.nom}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            candidate.categorie === 'femmes' 
                              ? 'bg-pink-100 text-pink-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {candidate.categorie === 'femmes' ? 'Miss' : 'Mister'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {candidate.votes.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Historique des Transactions
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre de votes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Montant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {votes.slice().reverse().map((vote) => (
                    <tr key={vote.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(vote.timestamp).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {allCandidates.find(c => c.id === vote.candidateId)?.nom || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vote.voteCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vote.amount.toLocaleString()} FCFA
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Payé
                        </span>
                      </td>
                    </tr>
                  ))}
                  {votes.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        Aucune transaction pour le moment
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      {/* Informations sur les dates */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6"
      >
        <h4 className="text-lg font-semibold text-yellow-800 mb-2">
          Informations importantes
        </h4>
        <p className="text-yellow-700">
          Les résultats seront cachés au public à partir du {new Date(CONTEST_DATES.resultsHiddenAfter).toLocaleDateString('fr-FR')}
        </p>
      </motion.div>
    </div>
  )
}

export default Admin