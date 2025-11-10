import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useVote } from '../contexts/VoteContext';
import RealtimeIndicator from '../components/common/RealtimeIndicator';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  const { candidates, stats, lastUpdate, loading } = useVote();
  const [localStats, setLocalStats] = useState({
    totalVotes: 0,
    missVotes: 0,
    misterVotes: 0,
    totalCandidates: 0
  });

  // Mettre à jour les stats locales quand les stats globales changent
  useEffect(() => {
    if (stats) {
      setLocalStats(stats);
    }
  }, [stats]);

  const featuredCandidates = candidates.slice(0, 4);

  const steps = [
    {
      number: '01',
      title: 'Découvrez les candidats',
      description: 'Parcourez les profils des 12 candidats en lice pour le titre prestigieux.',
      icon: '👑'
    },
    {
      number: '02',
      title: 'Choisissez votre favori',
      description: 'Sélectionnez le candidat que vous souhaitez soutenir dans cette compétition.',
      icon: '❤'
    },
    {
      number: '03',
      title: 'Votez en illimité',
      description: 'Entrez le nombre de votes souhaité. Chaque vote coûte 100 FCFA.',
      icon: '💰'
    }
  ];

  if (loading && candidates.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <LoadingSpinner size="large" text="Chargement des candidats..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Indicateur temps réel */}
      <RealtimeIndicator />

      {/* Hero Section Élégante */}
      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-gold-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')] bg-cover bg-center"></div>
        
        <div className="relative z-20 container-custom py-32 md:py-48">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="typography-cursive text-5xl md:text-7xl text-gold-400 mb-6">
              Miss & Mister
            </h1>
            <h2 className="font-serif text-2xl md:text-4xl mb-6 text-white">
              FSS Médecine 2025
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Élisez l'élégance et le charisme de la Faculté des Sciences de la Santé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/vote" className="btn-primary text-lg px-12 py-4 animate-pulse-gold">
                Voter Maintenant
              </Link>
              <Link to="/candidates" className="btn-secondary text-lg px-12 py-4 border-white text-white hover:bg-white hover:text-charcoal-900">
                Découvrir les Candidats
              </Link>
            </div>
          </div>
        </div>

        {/* Vague décorative */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Statistiques avec animation de mise à jour */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900">
                Le Concours en Chiffres
              </h2>
              {lastUpdate && (
                <div className="flex items-center space-x-2 text-sm text-gold-600 bg-gold-50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>En direct</span>
                </div>
              )}
            </div>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Découvrez l'ampleur de cet événement prestigieux à travers les chiffres mis à jour en temps réel
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <StatCard
              value={localStats.totalCandidates}
              label="Candidats"
              icon="👥"
              color="gold"
            />
            <StatCard
              value={localStats.totalVotes.toLocaleString()}
              label="Votes Totaux"
              icon="🗳"
              color="blue"
            />
            <StatCard
              value={localStats.missVotes.toLocaleString()}
              label="Votes Miss"
              icon="👑"
              color="pink"
            />
            <StatCard
              value={localStats.misterVotes.toLocaleString()}
              label="Votes Mister"
              icon="🤵"
              color="purple"
            />
          </div>

          {/* Dernière mise à jour */}
          {lastUpdate && (
            <div className="text-center mt-8">
              <p className="text-charcoal-500 text-sm">
                Dernière mise à jour : {lastUpdate.toLocaleTimeString('fr-FR')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Processus de vote */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-4">
              Comment Voter ?
            </h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Un processus simple et sécurisé en seulement 3 étapes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="card-elegant text-center p-8 group hover:border-gold-300 transition-all duration-300">
                <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                  {step.icon}
                </div>
                <div className="text-gold-600 font-serif text-2xl mb-2">{step.number}</div>
                <h3 className="font-serif text-2xl text-charcoal-900 mb-4">{step.title}</h3>
                <p className="text-charcoal-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/vote" className="btn-primary text-lg px-12 py-4">
              Commencer à Voter
            </Link>
          </div>
        </div>
      </section>

      {/* Candidats en vedette */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-4">
              Candidats en Vedette
            </h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Découvrez quelques-uns de nos prestigieux candidats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCandidates.map((candidate) => (
              <div key={candidate.id} className="card-elegant overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={candidate.photo}
                    alt={candidate.nom}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500 text-white">
                    {candidate.categorie}
                  </div>
                  
                  {/* Badge de votes en temps réel */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                      {candidate.votes?.toLocaleString() || 0} votes
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl text-charcoal-900 mb-2">{candidate.nom}</h3>
                  <p className="text-charcoal-600 text-sm mb-4 line-clamp-2">{candidate.description}</p>
                  <Link
                    to={`/candidates`}
                    className="text-gold-600 hover:text-gold-700 font-semibold text-sm inline-flex items-center"
                  >
                    Voir le profil
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {featuredCandidates.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-charcoal-600">Aucun candidat disponible pour le moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/candidates" className="btn-secondary text-lg px-12 py-4">
              Voir Tous les Candidats
            </Link>
          </div>
        </div>
      </section>

      {/* Section CTA Finale */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Prêt à élire votre favori ?
            </h2>
            <p className="text-xl text-gold-100 mb-8 leading-relaxed">
              Rejoignez des centaines de personnes qui ont déjà soutenu leur candidat préféré. 
              Chaque vote compte dans cette compétition prestigieuse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/vote" 
                className="bg-white text-gold-600 hover:bg-gray-100 font-sans font-semibold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Voter Maintenant
              </Link>
              <Link 
                to="/candidates" 
                className="border-2 border-white text-white hover:bg-white hover:text-gold-600 font-sans font-semibold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Explorer les Candidats
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Composant de carte statistique avec animation
const StatCard = ({ value, label, icon, color }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setDisplayValue(value);
      setIsAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [value]);

  const colorClasses = {
    gold: 'text-gold-600 bg-gold-100',
    blue: 'text-blue-600 bg-blue-100',
    pink: 'text-pink-600 bg-pink-100',
    purple: 'text-purple-600 bg-purple-100'
  };

  return (
    <div className="text-center transform transition-all duration-500 hover:scale-105">
      <div className={`w-20 h-20 ${colorClasses[color]} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 transition-all duration-300`}>
        {icon}
      </div>
      <div className={`font-serif text-5xl md:text-6xl text-charcoal-900 mb-2 transition-all duration-500 ${
        isAnimating ? 'animate-pulse scale-110' : ''
      }`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="font-sans text-charcoal-600 uppercase tracking-wider text-sm">
        {label}
      </div>
    </div>
  );
};

export default Home;