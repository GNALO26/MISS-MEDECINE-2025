import React, { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import { candidateService } from '../services/candidateService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [voteHistory, setVoteHistory] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (token) {
        const isValid = await adminService.verifyToken(token);
        setIsAuthenticated(isValid);
        if (isValid) {
          loadDashboardData();
        }
      }
    } catch (error) {
      console.error('Erreur de vérification:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      const [statsData, historyData, candidatesData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getVoteHistory(),
        candidateService.getAllCandidates()
      ]);
      
      setStats(statsData);
      setVoteHistory(historyData);
      setCandidates(candidatesData);
    } catch (error) {
      console.error('Erreur chargement données:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = await adminService.login(loginForm.email, loginForm.password);
      if (token) {
        localStorage.setItem('admin_token', token);
        setIsAuthenticated(true);
        await loadDashboardData();
      }
    } catch (error) {
      alert('Erreur de connexion: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setStats(null);
    setVoteHistory([]);
    setCandidates([]);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="text-center mb-8">
                <h1 className="font-serif text-3xl text-charcoal-900 mb-2">
                  Administration
                </h1>
                <p className="text-charcoal-600">
                  Connectez-vous pour accéder au tableau de bord
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block font-sans font-semibold text-charcoal-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                    placeholder="admin@fss-medecine.bj"
                    required
                  />
                </div>

                <div>
                  <label className="block font-sans font-semibold text-charcoal-900 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 flex items-center justify-center"
                >
                  {loading ? <LoadingSpinner /> : 'Se connecter'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* En-tête Admin */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6">
            <div>
              <h1 className="font-serif text-3xl text-charcoal-900 mb-2">
                Tableau de Bord Admin
              </h1>
              <p className="text-charcoal-600">
                Gestion du concours Miss & Mister FSS Médecine 2025
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              className="mt-4 md:mt-0 px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-300 font-sans font-medium"
            >
              Déconnexion
            </button>
          </div>

          {/* Navigation onglets */}
          <div className="flex space-x-8 -mb-px">
            {[
              { id: 'dashboard', name: 'Tableau de Bord' },
              { id: 'candidates', name: 'Gestion Candidats' },
              { id: 'transactions', name: 'Historique Votes' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-sans font-medium text-sm transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'border-gold-500 text-gold-600'
                    : 'border-transparent text-charcoal-500 hover:text-charcoal-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Tableau de Bord */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-8">
            {/* Cartes statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-charcoal-500 text-sm font-medium mb-1">Revenu Total</p>
                    <p className="font-serif text-3xl text-charcoal-900">
                      {formatCurrency(stats.totalRevenue)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
                <p className="text-green-600 text-sm font-medium mt-2">
                  {stats.totalVotes} votes au total
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-charcoal-500 text-sm font-medium mb-1">Transactions</p>
                    <p className="font-serif text-3xl text-charcoal-900">
                      {stats.totalTransactions}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
                <p className="text-blue-600 text-sm font-medium mt-2">
                  Paiements réussis
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-charcoal-500 text-sm font-medium mb-1">Candidats Miss</p>
                    <p className="font-serif text-3xl text-charcoal-900">
                      {stats.missCount}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👑</span>
                  </div>
                </div>
                <p className="text-pink-600 text-sm font-medium mt-2">
                  {stats.missVotes} votes
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-charcoal-500 text-sm font-medium mb-1">Candidats Mister</p>
                    <p className="font-serif text-3xl text-charcoal-900">
                      {stats.misterCount}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🤵</span>
                  </div>
                </div>
                <p className="text-purple-600 text-sm font-medium mt-2">
                  {stats.misterVotes} votes
                </p>
              </div>
            </div>

            {/* Candidats leaders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-serif text-2xl text-charcoal-900 mb-6">Classement des Candidats</h2>
              <div className="space-y-4">
                {candidates
                  .sort((a, b) => (b.votes || 0) - (a.votes || 0))
                  .slice(0, 5)
                  .map((candidate, index) => (
                    <div key={candidate.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 font-bold">
                          {index + 1}
                        </div>
                        <img
                          src={candidate.photo}
                          alt={candidate.nom}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-sans font-semibold text-charcoal-900">
                            {candidate.nom}
                          </h3>
                          <p className="text-charcoal-500 text-sm">
                            {candidate.categorie}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-sans font-bold text-charcoal-900 text-lg">
                          {candidate.votes?.toLocaleString() || 0}
                        </p>
                        <p className="text-charcoal-500 text-sm">votes</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Gestion des Candidats */}
        {activeTab === 'candidates' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-serif text-2xl text-charcoal-900">Gestion des Candidats</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Candidat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Catégorie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Votes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Pourcentage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {candidates.map((candidate) => {
                    const totalVotes = candidates.reduce((sum, c) => sum + (c.votes || 0), 0);
                    const percentage = totalVotes > 0 ? ((candidate.votes || 0) / totalVotes) * 100 : 0;
                    
                    return (
                      <tr key={candidate.id} className="hover:bg-gray-50 transition-colors duration-300">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={candidate.photo}
                              alt={candidate.nom}
                              className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                            <div>
                              <div className="font-sans font-medium text-charcoal-900">
                                {candidate.nom}
                              </div>
                              <div className="text-charcoal-500 text-sm line-clamp-1 max-w-xs">
                                {candidate.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            candidate.categorie === 'Miss' 
                              ? 'bg-pink-100 text-pink-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {candidate.categorie}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-sans font-semibold text-charcoal-900">
                          {candidate.votes?.toLocaleString() || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gold-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-charcoal-600 text-sm font-medium w-12">
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Historique des Transactions */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-serif text-2xl text-charcoal-900">Historique des Votes</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Candidat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Votes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Montant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {voteHistory.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-300">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-600">
                        {formatDate(transaction.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={transaction.candidates?.photo}
                            alt={transaction.candidates?.nom}
                            className="w-8 h-8 rounded-full object-cover mr-2"
                          />
                          <span className="font-sans font-medium text-charcoal-900">
                            {transaction.candidates?.nom}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-sans font-semibold text-charcoal-900">
                        {transaction.vote_count} vote{transaction.vote_count > 1 ? 's' : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-sans font-semibold text-gold-600">
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status === 'completed' ? 'Complété' : 
                           transaction.status === 'pending' ? 'En attente' : 'Échoué'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {voteHistory.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="font-serif text-xl text-charcoal-900 mb-2">Aucune transaction</h3>
                <p className="text-charcoal-600">Aucun vote n'a encore été enregistré.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;