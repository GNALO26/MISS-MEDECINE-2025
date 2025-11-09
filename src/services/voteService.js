import { supabase } from '../utils/supabase'

export const voteService = {
  // Enregistrer un vote
  async recordVote(voteData) {
    const { data, error } = await supabase
      .from('votes')
      .insert([{
        candidate_id: voteData.candidateId,
        candidate_name: voteData.candidateName,
        vote_count: voteData.voteCount,
        amount: voteData.amount,
        payment_data: voteData.paymentData,
        transaction_id: voteData.transactionId,
        status: 'completed'
      }])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Récupérer l'historique des votes
  async getVoteHistory() {
    const { data, error } = await supabase
      .from('votes')
      .select(`
        *,
        candidates(nom, categorie)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Obtenir les statistiques
  async getVoteStats() {
    const { data, error } = await supabase
      .from('votes')
      .select('vote_count, amount')
    
    if (error) throw error
    
    const totalVotes = data.reduce((sum, vote) => sum + vote.vote_count, 0)
    const totalAmount = data.reduce((sum, vote) => sum + vote.amount, 0)
    
    return { totalVotes, totalAmount }
  }
}