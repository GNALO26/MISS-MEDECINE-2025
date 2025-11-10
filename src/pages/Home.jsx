import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCandidates } from '../hooks/useCandidates';

const Home = () => {
  const { candidates, loading } = useCandidates();
  const [stats, setStats] = useState({
    totalVotes: 0,
    missVotes: 0,
    misterVotes: 0,
    totalCandidates: 0
  });

  useEffect(() => {
    if (candidates.length > 0) {
      const totalVotes = candidates.reduce((sum, candidate) => sum + (candidate.votes || 0), 0);
      const missVotes = candidates
        .filter(c => c.categorie === 'Miss')
        .reduce((sum, candidate) => sum + (candidate.votes || 0), 0);
      const misterVotes = candidates
        .filter(c => c.categorie === 'Mister')
        .reduce((sum, candidate) => sum + (candidate.votes || 0), 0);

      setStats({
        totalVotes,
        missVotes,
        misterVotes,
        totalCandidates: candidates.length
      });
    }
  }, [candidates]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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

      {/* Statistiques */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-4">
              Le Concours en Chiffres
            </h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Découvrez l'ampleur de cet événement prestigieux à travers les chiffres clés
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="font-serif text-5xl md:text-6xl text-gold-600 mb-2">
                {stats.totalCandidates}
              </div>
              <div className="font-sans text-charcoal-600 uppercase tracking-wider text-sm">
                Candidats
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-5xl md:text-6xl text-gold-600 mb-2">
                {stats.totalVotes.toLocaleString()}
              </div>
              <div className="font-sans text-charcoal-600 uppercase tracking-wider text-sm">
                Votes Totaux
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-5xl md:text-6xl text-gold-600 mb-2">
                {stats.missVotes.toLocaleString()}
              </div>
              <div className="font-sans text-charcoal-600 uppercase tracking-wider text-sm">
                Votes Miss
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-5xl md:text-6xl text-gold-600 mb-2">
                {stats.misterVotes.toLocaleString()}
              </div>
              <div className="font-sans text-charcoal-600 uppercase tracking-wider text-sm">
                Votes Mister
              </div>
            </div>
          </div>
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

          <div className="text-center mt-12">
            <Link to="/candidates" className="btn-secondary text-lg px-12 py-4">
              Voir Tous les Candidats
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;