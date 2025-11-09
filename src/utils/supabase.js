import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yvtnlmioraiqumtdggma.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dG5sbWlvcmFpcXVtdGRnZ21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MzM4NDAsImV4cCI6MjA3ODIwOTg0MH0.948fcBv_-wJMTzmET5aK_aoZLC1f-Wk9xQEm_LBnD9Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Configuration de l'application
export const APP_CONFIG = {
  VOTE_PRICE: 100,
  MAX_VOTES: 1000,
  CONTEST_DATES: {
    start: '2025-12-01',
    end: '2025-12-31',
    resultsHiddenAfter: '2025-12-18'
  }
}