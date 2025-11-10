// Configuration de l'application
export const APP_CONFIG = {
  NAME: 'Miss & Mister FSS Médecine',
  YEAR: '2025',
  VERSION: '1.0.0',
  ORGANIZER: 'Faculté des Sciences de la Santé',
  SUPPORT_EMAIL: 'contact@miss_mister-fss-medecine.bj',
  SUPPORT_PHONE: '+229 01 56 03 58 88'
};

// Configuration des votes
export const VOTE_CONFIG = {
  PRICE_PER_VOTE: 100, // FCFA
  CURRENCY: 'FCFA',
  MIN_VOTES: 1,
  MAX_VOTES: 100000,
  PAYMENT_PROVIDER: 'kkiapay'
};

// Catégories de candidats
export const CATEGORIES = {
  MISS: {
    id: 'Miss',
    name: 'Miss',
    color: 'pink',
    icon: '👑'
  },
  MISTER: {
    id: 'Mister',
    name: 'Mister',
    color: 'blue',
    icon: '🤵'
  }
};

// Statuts des transactions
export const TRANSACTION_STATUS = {
  PENDING: {
    value: 'pending',
    label: 'En attente',
    color: 'yellow'
  },
  COMPLETED: {
    value: 'completed',
    label: 'Complété',
    color: 'green'
  },
  FAILED: {
    value: 'failed',
    label: 'Échoué',
    color: 'red'
  },
  CANCELLED: {
    value: 'cancelled',
    label: 'Annulé',
    color: 'gray'
  }
};

// Configuration KkiaPay
export const KKIA_PAY_CONFIG = {
  PUBLIC_KEY: import.meta.env.VITE_KKIAPAY_PUBLIC_KEY,
  SANDBOX: import.meta.env.VITE_KKIAPAY_SANDBOX === 'true',
  CALLBACK_URL: `${window.location.origin}/vote/success`,
  THEME: '#D4AF37',
  POSITION: 'center'
};

// Messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Vérifiez votre internet.',
  PAYMENT_FAILED: 'Le paiement a échoué. Veuillez réessayer.',
  CANDIDATE_NOT_FOUND: 'Candidat non trouvé.',
  INSUFFICIENT_DATA: 'Données insuffisantes pour traiter la demande.',
  UNAUTHORIZED: 'Accès non autorisé.',
  DATABASE_ERROR: 'Erreur de base de données. Veuillez réessayer.'
};

// Messages de succès
export const SUCCESS_MESSAGES = {
  VOTE_SUCCESS: 'Votre vote a été enregistré avec succès !',
  PAYMENT_SUCCESS: 'Paiement effectué avec succès !',
  UPDATE_SUCCESS: 'Mise à jour effectuée avec succès !',
  LOGIN_SUCCESS: 'Connexion réussie !'
};

// Configuration responsive
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

// URLs des réseaux sociaux
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/fss-medecine',
  INSTAGRAM: 'https://instagram.com/missmister_fss',
  TWITTER: 'https://twitter.com/fss_medecine',
  WHATSAPP: 'https://wa.me/2290153914648'
};

// Données des candidats par défaut (fallback)
export const DEFAULT_CANDIDATES = {
  MISS: [
    {
      id: 1,
      nom: 'Aïcha Bello',
      photo: '/images/candidates/femmes/aicha-bello.jpg',
      description: 'Étudiante en Médecine, passionnée par la pédiatrie',
      categorie: 'Miss',
      votes: 0
    },
    {
      id: 2,
      nom: 'Fatou Diallo',
      photo: '/images/candidates/femmes/fatou-diallo.jpg',
      description: 'Future chirurgienne, engagée pour la santé des femmes',
      categorie: 'Miss',
      votes: 0
    }
    // ... autres candidates
  ],
  MISTER: [
    {
      id: 7,
      nom: 'Kevin Dossou',
      photo: '/images/candidates/hommes/kevin-dossou.jpg',
      description: 'Étudiant en Pharmacie, spécialisé en pharmacologie',
      categorie: 'Mister',
      votes: 0
    },
    {
      id: 8,
      nom: 'Marc Zinssou',
      photo: '/images/candidates/hommes/marc-zinssou.jpg',
      description: 'Future médecin généraliste, passionné de recherche',
      categorie: 'Mister',
      votes: 0
    }
    // ... autres candidats
  ]
};