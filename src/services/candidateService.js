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