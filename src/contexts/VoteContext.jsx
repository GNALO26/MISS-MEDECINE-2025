import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCandidates } from '../hooks/useCandidates';

const VoteContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useVote = () => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error('useVote doit être utilisé dans un VoteProvider');
  }
  return context;
};

export const VoteProvider = ({ children }) => {
  const {
    candidates,
    loading,
    error,
    lastUpdate,
    stats,
    updateCandidateVotes,
    getCandidateById,
    getCandidatesByCategory,
    refetch
  } = useCandidates();

  const [realtimeEnabled, setRealtimeEnabled] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);

  // Effet pour compter les mises à jour (débogage)
  useEffect(() => {
    if (lastUpdate) {
      setUpdateCount(prev => prev + 1);
      console.log(`🔄 Mise à jour #${updateCount + 1} à ${lastUpdate.toLocaleTimeString()}`);
    }
  }, [lastUpdate]);

  // Fonction pour voter
  const voteForCandidate = async (candidateId, voteCount) => {
    try {
      await updateCandidateVotes(candidateId, voteCount);
      console.log(`✅ ${voteCount} vote(s) ajouté(s) au candidat ${candidateId}`);
      return true;
    } catch (error) {
      console.error('❌ Erreur lors du vote:', error);
      throw error;
    }
  };

  // Fonction pour obtenir le classement
  const getRanking = () => {
    return [...candidates].sort((a, b) => (b.votes || 0) - (a.votes || 0));
  };

  // Fonction pour obtenir les leaders
  const getLeaders = (limit = 3) => {
    return getRanking().slice(0, limit);
  };

  const value = {
    // Données
    candidates,
    loading,
    error,
    lastUpdate,
    stats,
    updateCount,
    
    // Fonctions
    voteForCandidate,
    getCandidateById,
    getCandidatesByCategory,
    getRanking,
    getLeaders,
    refetch,
    
    // Contrôles temps réel
    realtimeEnabled,
    setRealtimeEnabled
  };

  return (
    <VoteContext.Provider value={value}>
      {children}
    </VoteContext.Provider>
  );
};

// Export par défaut pour le provider
export default VoteProvider;