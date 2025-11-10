import { supabase } from '../utils/supabase';

export const voteService = {
  // Traiter un vote
  async processVote(voteData) {
    // 1. Créer une transaction en attente
    const { data: transaction, error: transactionError } = await supabase
      .from('votes')
      .insert({
        candidate_id: voteData.candidateId,
        vote_count: voteData.voteCount,
        amount: voteData.amount,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (transactionError) {
      throw new Error(`Erreur lors de la création de la transaction: ${transactionError.message}`);
    }

    return transaction;
  },

  // Confirmer un vote après paiement
  async confirmVote(transactionId, paymentTransactionId) {
    // 1. Récupérer la transaction
    const { data: transaction, error: fetchError } = await supabase
      .from('votes')
      .select('*')
      .eq('id', transactionId)
      .single();

    if (fetchError) {
      throw new Error(`Transaction non trouvée: ${fetchError.message}`);
    }

    // 2. Mettre à jour le statut de la transaction
    const { error: updateError } = await supabase
      .from('votes')
      .update({
        status: 'completed',
        transaction_id: paymentTransactionId,
        completed_at: new Date().toISOString()
      })
      .eq('id', transactionId);

    if (updateError) {
      throw new Error(`Erreur lors de la confirmation: ${updateError.message}`);
    }

    // 3. Mettre à jour les votes du candidat
    const { error: candidateError } = await supabase.rpc('increment_votes', {
      candidate_id: transaction.candidate_id,
      vote_increment: transaction.vote_count
    });

    if (candidateError) {
      throw new Error(`Erreur lors de la mise à jour des votes: ${candidateError.message}`);
    }

    return true;
  },

  // Récupérer l'historique des votes
  async getVoteHistory(limit = 50) {
    const { data, error } = await supabase
      .from('votes')
      .select(`
        *,
        candidates (nom, categorie, photo)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Erreur lors de la récupération de l'historique: ${error.message}`);
    }

    return data || [];
  },

  // Récupérer les statistiques de vente
  async getSalesStats() {
    const { data, error } = await supabase
      .from('votes')
      .select('amount, status, created_at');

    if (error) {
      throw new Error(`Erreur lors de la récupération des stats de vente: ${error.message}`);
    }

    const completedTransactions = data.filter(t => t.status === 'completed');
    const totalRevenue = completedTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalVotes = completedTransactions.reduce((sum, t) => {
      const voteCount = t.amount / 100; // 100 FCFA par vote
      return sum + voteCount;
    }, 0);

    return {
      totalRevenue,
      totalVotes: Math.round(totalVotes),
      totalTransactions: completedTransactions.length
    };
  }
};