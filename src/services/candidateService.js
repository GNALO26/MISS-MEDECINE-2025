import { supabase } from '../utils/supabase';

export const candidateService = {
  // Récupérer tous les candidats
  async getAllCandidates() {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('votes', { ascending: false });

    if (error) {
      throw new Error(`Erreur lors de la récupération des candidats: ${error.message}`);
    }

    return data || [];
  },

  // Récupérer un candidat par ID
  async getCandidateById(id) {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Erreur lors de la récupération du candidat: ${error.message}`);
    }

    return data;
  },

  // Mettre à jour les votes d'un candidat
  async updateCandidateVotes(candidateId, additionalVotes) {
    const { data, error } = await supabase.rpc('increment_votes', {
      candidate_id: candidateId,
      vote_increment: additionalVotes
    });

    if (error) {
      throw new Error(`Erreur lors de la mise à jour des votes: ${error.message}`);
    }

    return data;
  },

  // Récupérer les statistiques globales
  async getVoteStats() {
    const { data, error } = await supabase
      .from('candidates')
      .select('categorie, votes');

    if (error) {
      throw new Error(`Erreur lors de la récupération des stats: ${error.message}`);
    }

    const totalVotes = data.reduce((sum, candidate) => sum + (candidate.votes || 0), 0);
    const missVotes = data
      .filter(c => c.categorie === 'Miss')
      .reduce((sum, candidate) => sum + (candidate.votes || 0), 0);
    const misterVotes = data
      .filter(c => c.categorie === 'Mister')
      .reduce((sum, candidate) => sum + (candidate.votes || 0), 0);

    return {
      totalVotes,
      missVotes,
      misterVotes,
      totalCandidates: data.length
    };
  }
};

// Abonnements en temps réel
export const subscribeToCandidates = (callback) => {
  console.log('🔔 Démarrage abonnement candidats temps réel...');
  
  const subscription = supabase
    .channel('candidates-changes')
    .on(
      'postgres_changes',
      {
        event: '*', // INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'candidates'
      },
      (payload) => {
        console.log('🔄 Changement candidat détecté:', payload);
        callback(payload);
      }
    )
    .subscribe((status) => {
      console.log('📡 Statut abonnement candidats:', status);
    });

  return subscription;
};

export const subscribeToVotes = (callback) => {
  console.log('🔔 Démarrage abonnement votes temps réel...');
  
  const subscription = supabase
    .channel('votes-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'votes'
      },
      (payload) => {
        console.log('🔄 Changement vote détecté:', payload);
        callback(payload);
      }
    )
    .subscribe((status) => {
      console.log('📡 Statut abonnement votes:', status);
    });

  return subscription;
};

// Fonction pour s'abonner aux mises à jour d'un candidat spécifique
export const subscribeToCandidate = (candidateId, callback) => {
  return supabase
    .channel(`candidate-${candidateId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'candidates',
        filter: `id=eq.${candidateId}`
      },
      (payload) => {
        console.log(`🔄 Mise à jour candidat ${candidateId}:`, payload);
        callback(payload);
      }
    )
    .subscribe();
};