import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variables d\'environnement Supabase manquantes');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fonctions utilitaires Supabase
export const supabaseUtils = {
  // Écouter les changements en temps réel
  subscribeToTable(table, callback) {
    return supabase
      .channel('public:' + table)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table }, 
        callback
      )
      .subscribe();
  },

  // Télécharger un fichier
  async uploadFile(bucket, path, file) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);

    if (error) throw error;
    return data;
  },

  // Récupérer l'URL d'un fichier
  getFileUrl(bucket, path) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  },

  // Gérer les erreurs
  handleError(error) {
    console.error('Erreur Supabase:', error);
    
    if (error.code === 'PGRST301') {
      throw new Error('Données non trouvées');
    } else if (error.code === '42501') {
      throw new Error('Permission refusée');
    } else if (error.code === '23505') {
      throw new Error('Doublon détecté');
    } else {
      throw new Error(`Erreur base de données: ${error.message}`);
    }
  }
};

// Fonction pour incrémenter les votes (RPC)
export const incrementVotes = async (candidateId, voteIncrement) => {
  const { data, error } = await supabase.rpc('increment_votes', {
    candidate_id: candidateId,
    vote_increment: voteIncrement
  });

  if (error) {
    supabaseUtils.handleError(error);
  }

  return data;
};