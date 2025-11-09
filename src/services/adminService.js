import { supabase } from '../utils/supabase'

export const adminService = {
  // Vérifier si un utilisateur est admin
  async isAdmin(email) {
    const { data, error } = await supabase
      .from('admins')
      .select('email')
      .eq('email', email)
      .single()
    
    return !error && data !== null
  },

  // Obtenir les paramètres
  async getSettings() {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
    
    if (error) throw error
    
    const settings = {}
    data.forEach(setting => {
      settings[setting.key] = setting.value
    })
    
    return settings
  },

  // Mettre à jour les paramètres
  async updateSettings(key, value) {
    const { data, error } = await supabase
      .from('settings')
      .update({ value })
      .eq('key', key)
      .select()
    
    if (error) throw error
    return data[0]
  }
}