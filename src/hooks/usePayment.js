import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { KKIAPAY_CONFIG, VOTE_PRICE } from '../utils/constants'

export const usePayment = () => {
  const [processing, setProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)

  const initializeKkiapay = () => {
    if (!window.Kkiapay) {
      console.error('KkiaPay SDK non chargé')
      toast.error('Erreur de configuration du paiement')
      return false
    }

    try {
      window.Kkiapay.init(KKIAPAY_CONFIG.publicKey, {
        sandbox: KKIAPAY_CONFIG.sandbox,
        theme: KKIAPAY_CONFIG.theme
      })
      return true
    } catch (error) {
      console.error('Erreur d\'initialisation KkiaPay:', error)
      return false
    }
  }

  const processPayment = async (candidate, voteCount) => {
    return new Promise((resolve, reject) => {
      setProcessing(true)
      setPaymentStatus('processing')

      const amount = voteCount * VOTE_PRICE

      // Vérifier que KkiaPay est initialisé
      if (!initializeKkiapay()) {
        setProcessing(false)
        setPaymentStatus('failed')
        reject(new Error('KkiaPay non initialisé'))
        return
      }

      try {
        // Ouvrir le widget de paiement
        window.Kkiapay.open({
          amount: amount,
          name: `Votes pour ${candidate.nom}`,
          data: {
            candidateId: candidate.id,
            candidateName: candidate.nom,
            voteCount: voteCount,
            amount: amount,
            timestamp: new Date().toISOString()
          },
          callback: (response) => {
            setProcessing(false)
            
            switch (response.status) {
              case 'SUCCESS':
                setPaymentStatus('success')
                toast.success(`Paiement réussi! ${voteCount} votes ajoutés`)
                resolve({
                  success: true,
                  data: response,
                  candidate: candidate,
                  voteCount: voteCount,
                  amount: amount
                })
                break
                
              case 'FAILED':
                setPaymentStatus('failed')
                toast.error('Paiement échoué. Veuillez réessayer.')
                reject(new Error('Paiement échoué'))
                break
                
              case 'PENDING':
                setPaymentStatus('pending')
                toast.loading('Paiement en attente de confirmation...')
                // Vous pourriez vouloir gérer les paiements en attente différemment
                resolve({
                  success: true, // On considère le paiement comme réussi même s'il est en attente
                  pending: true,
                  data: response
                })
                break
                
              default:
                setPaymentStatus('unknown')
                toast.error('Statut de paiement inconnu')
                reject(new Error('Statut de paiement inconnu'))
            }
          },
          onError: (error) => {
            setProcessing(false)
            setPaymentStatus('error')
            console.error('Erreur KkiaPay:', error)
            toast.error('Erreur lors du traitement du paiement')
            reject(error)
          }
        })
      } catch (error) {
        setProcessing(false)
        setPaymentStatus('error')
        console.error('Exception lors du paiement:', error)
        toast.error('Erreur inattendue lors du paiement')
        reject(error)
      }
    })
  }

  const resetPaymentStatus = () => {
    setPaymentStatus(null)
    setProcessing(false)
  }

  return {
    processPayment,
    processing,
    paymentStatus,
    resetPaymentStatus
  }
}