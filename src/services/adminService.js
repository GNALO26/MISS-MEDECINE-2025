import { supabase } from '../utils/supabase';

export const adminService = {
  // Connexion administrateur
  async login(email, password) {
    // Note: En production, utilisez l'authentification Supabase
    // Pour le moment, simulation avec des credentials fixes
    const validAdmins = [
      { email: 'admin@fss-medecine.bj', password: 'admin123', name: 'Admin Principal' },
      { email: 'organisateur@fss-medecine.bj', password: 'org123', name: 'Organisateur' }
    ];

    const admin = validAdmins.find(a => a.email === email && a.password === password);
    
    if (admin) {
      // Générer un token simple (en production, utilisez JWT)
      const token = btoa(JSON.stringify({
        email: admin.email,
        name: admin.name,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 heures
      }));
      
      return token;
    } else {
      throw new Error('Email ou mot de passe incorrect');
    }
  },

  // Vérifier le token
  async verifyToken(token) {
    try {
      const decoded = JSON.parse(atob(token));
      
      // Vérifier l'expiration
      if (decoded.exp < Date.now()) {
        localStorage.removeItem('admin_token');
        return null;
      }
      
      return decoded;
    } catch (error) {
      localStorage.removeItem('admin_token');
      return null;
    }
  },

  // Récupérer les statistiques du dashboard
  async getDashboardStats() {
    try {
      // Récupérer les candidats et leurs votes
      const { data: candidates, error: candidatesError } = await supabase
        .from('candidates')
        .select('*');

      if (candidatesError) throw candidatesError;

      // Récupérer les transactions
      const { data: transactions, error: transactionsError } = await supabase
        .from('votes')
        .select('*')
        .eq('status', 'completed');

      if (transactionsError) throw transactionsError;

      // Calculer les statistiques
      const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
      const totalVotes = transactions.reduce((sum, t) => sum + t.vote_count, 0);
      
      const missCandidates = candidates.filter(c => c.categorie === 'Miss');
      const misterCandidates = candidates.filter(c => c.categorie === 'Mister');
      
      const missVotes = missCandidates.reduce((sum, c) => sum + (c.votes || 0), 0);
      const misterVotes = misterCandidates.reduce((sum, c) => sum + (c.votes || 0), 0);

      return {
        totalRevenue,
        totalVotes,
        totalTransactions: transactions.length,
        missCount: missCandidates.length,
        misterCount: misterCandidates.length,
        missVotes,
        misterVotes
      };
    } catch (error) {
      throw new Error(`Erreur récupération stats: ${error.message}`);
    }
  },

  // Récupérer l'historique des votes
  async getVoteHistory(limit = 50) {
    try {
      const { data, error } = await supabase
        .from('votes')
        .select(`
          *,
          candidates (nom, photo, categorie)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data || [];
    } catch (error) {
      throw new Error(`Erreur récupération historique: ${error.message}`);
    }
  },

  // Mettre à jour les paramètres
  async updateSettings(settings) {
    try {
      const updates = Object.entries(settings).map(([key, value]) => 
        supabase
          .from('settings')
          .upsert({ key, value, updated_at: new Date().toISOString() })
      );

      await Promise.all(updates);
      return true;
    } catch (error) {
      throw new Error(`Erreur mise à jour paramètres: ${error.message}`);
    }
  },

  // Récupérer les paramètres
  async getSettings() {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*');

      if (error) throw error;

      const settings = {};
      data.forEach(setting => {
        settings[setting.key] = setting.value;
      });

      return settings;
    } catch (error) {
      throw new Error(`Erreur récupération paramètres: ${error.message}`);
    }
  }
};