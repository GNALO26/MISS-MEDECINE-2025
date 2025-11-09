import { toast } from 'react-hot-toast'
import { KKIAPAY_CONFIG, VOTE_PRICE } from './constants'

export const processPayment = async (candidate, voteCount, onSuccess, onError) => {
  const amount = voteCount * VOTE_PRICE
  
  try {
    // Configuration KkiaPay
    window.Kkiapay.init(KKIAPAY_CONFIG.publicKey, {
      sandbox: KKIAPAY_CONFIG.sandbox,
      theme: KKIAPAY_CONFIG.theme
    })

    // Ouvrir le widget de paiement
    window.Kkiapay.open({
      amount: amount,
      name: `Votes pour ${candidate.nom}`,
      data: {
        candidateId: candidate.id,
        voteCount: voteCount,
        candidateName: candidate.nom
      },
      callback: (response) => {
        if (response.status === 'SUCCESS') {
          toast.success(`Paiement réussi! ${voteCount} votes ajoutés pour ${candidate.nom}`)
          onSuccess(response)
        } else {
          toast.error('Paiement échoué. Veuillez réessayer.')
          onError(response)
        }
      }
    })
  } catch (error) {
    console.error('Erreur de paiement:', error)
    toast.error('Erreur lors du traitement du paiement')
    onError(error)
  }
}