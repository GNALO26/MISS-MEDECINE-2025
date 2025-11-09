export const VOTE_PRICE = 100 // 100 FCFA par vote
export const MAX_VOTES_PER_TRANSACTION = 1000

// Dates du concours
export const CONTEST_DATES = {
  start: '2025-12-01',
  end: '2025-12-31',
  resultsHiddenAfter: '2025-12-18' // 2 semaines avant la fin
}

// Configuration KkiaPay
export const KKIAPAY_CONFIG = {
  publicKey: 'test_key_kkiapay',
  sandbox: true, // Mettre à true pour les tests
  theme: '#FF6B35'
}