import { useState, useEffect } from 'react';
import { candidateService } from '../services/candidateService';

export const useCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await candidateService.getAllCandidates();
      setCandidates(data);
    } catch (err) {
      setError(err.message);
      console.error('Erreur chargement candidats:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateCandidateVotes = async (candidateId, additionalVotes) => {
    try {
      await candidateService.updateCandidateVotes(candidateId, additionalVotes);
      // Recharger les candidats pour avoir les données à jour
      await loadCandidates();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getCandidateById = (id) => {
    return candidates.find(candidate => candidate.id === id);
  };

  const getCandidatesByCategory = (category) => {
    if (category === 'all') return candidates;
    return candidates.filter(candidate => candidate.categorie === category);
  };

  return {
    candidates,
    loading,
    error,
    updateCandidateVotes,
    getCandidateById,
    getCandidatesByCategory,
    refetch: loadCandidates
  };
};