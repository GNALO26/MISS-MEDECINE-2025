import { supabase } from '../utils/supabase'

export const candidateService = {
  // Récupérer tous les candidats
  async getAllCandidates() {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('votes', { ascending: false })
    
    if (error) throw error
    
    // Séparer par catégorie
    const femmes = data.filter(c => c.categorie === 'femmes')
    const hommes = data.filter(c => c.categorie === 'hommes')
    
    return { femmes, hommes }
  },

  // Récupérer un candidat par ID
  async getCandidateById(id) {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Mettre à jour les votes d'un candidat
  async updateCandidateVotes(candidateId, additionalVotes) {
    const candidate = await this.getCandidateById(candidateId)
    
    const { data, error } = await supabase
      .from('candidates')
      .update({ 
        votes: candidate.votes + additionalVotes,
        updated_at: new Date().toISOString()
      })
      .eq('id', candidateId)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Écouter les changements en temps réel
  subscribeToCandidates(callback) {
    return supabase
      .channel('candidates-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'candidates' },
        callback
      )
      .subscribe()
  }
}