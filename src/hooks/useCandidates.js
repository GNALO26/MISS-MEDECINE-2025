import { useState, useEffect, useCallback } from 'react';
import { candidateService, subscribeToCandidates, subscribeToVotes } from '../services/candidateService';

export const useCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Fonction pour charger les candidats
  const loadCandidates = useCallback(async () => {
    try {
      setError(null);
      const data = await candidateService.getAllCandidates();
      setCandidates(data);
      setLastUpdate(new Date());
      console.log('✅ Candidats chargés:', data.length);
    } catch (err) {
      setError(err.message);
      console.error('❌ Erreur chargement candidats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let candidatesSubscription;
    let votesSubscription;

    const initializeRealtime = async () => {
      try {
        // Chargement initial
        await loadCandidates();

        // Abonnement aux changements des candidats
        candidatesSubscription = subscribeToCandidates(async (payload) => {
          console.log('🔄 Mise à jour temps réel - Candidats:', payload);
          await loadCandidates(); // Recharger les données
        });

        // Abonnement aux changements des votes
        votesSubscription = subscribeToVotes(async (payload) => {
          console.log('🔄 Mise à jour temps réel - Votes:', payload);
          await loadCandidates(); // Recharger les données
        });

        console.log('🎯 Abonnements temps réel activés');
      } catch (err) {
        console.error('❌ Erreur initialisation temps réel:', err);
        setError('Erreur de connexion temps réel');
      }
    };

    initializeRealtime();

    // Nettoyage des abonnements
    return () => {
      console.log('🧹 Nettoyage des abonnements temps réel');
      if (candidatesSubscription) {
        candidatesSubscription.unsubscribe();
      }
      if (votesSubscription) {
        votesSubscription.unsubscribe();
      }
    };
  }, [loadCandidates]);

  // Fonction pour forcer le rechargement
  const refetch = useCallback(async () => {
    setLoading(true);
    await loadCandidates();
  }, [loadCandidates]);

  // Fonction pour mettre à jour les votes d'un candidat
  const updateCandidateVotes = async (candidateId, additionalVotes) => {
    try {
      await candidateService.updateCandidateVotes(candidateId, additionalVotes);
      // La mise à jour temps réel se chargera du rechargement
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Fonction pour obtenir un candidat par ID
  const getCandidateById = (id) => {
    return candidates.find(candidate => candidate.id === id);
  };

  // Fonction pour filtrer par catégorie
  const getCandidatesByCategory = (category) => {
    if (category === 'all') return candidates;
    return candidates.filter(candidate => candidate.categorie === category);
  };

  // Calcul des statistiques en temps réel
  const stats = {
    totalVotes: candidates.reduce((sum, candidate) => sum + (candidate.votes || 0), 0),
    missVotes: candidates
      .filter(c => c.categorie === 'Miss')
      .reduce((sum, candidate) => sum + (candidate.votes || 0), 0),
    misterVotes: candidates
      .filter(c => c.categorie === 'Mister')
      .reduce((sum, candidate) => sum + (candidate.votes || 0), 0),
    totalCandidates: candidates.length
  };

  return {
    candidates,
    loading,
    error,
    lastUpdate,
    stats,
    updateCandidateVotes,
    getCandidateById,
    getCandidatesByCategory,
    refetch
  };
};