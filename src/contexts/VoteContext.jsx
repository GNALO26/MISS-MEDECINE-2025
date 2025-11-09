import React, { createContext, useContext, useState, useEffect } from 'react'
import { candidateService, voteService } from '../services'
import { usePayment } from '../hooks/usePayment'
import { toast } from 'react-hot-toast'

const VoteContext = createContext()

export const useVote = () => {
  const context = useContext(VoteContext)
  if (!context) {
    throw new Error('useVote must be used within a VoteProvider')
  }
  return context
}

export const VoteProvider = ({ children }) => {
  const [candidates, setCandidates] = useState({ femmes: [], hommes: [] })
  const [votes, setVotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { processPayment, processing } = usePayment()

  // Charger les candidats
  const loadCandidates = async () => {
    try {
      setLoading(true)
      const data = await candidateService.getAllCandidates()
      setCandidates(data)
      setError(null)
    } catch (err) {
      console.error('Erreur chargement candidats:', err)
      setError('Impossible de charger les candidats')
      toast.error('Erreur de chargement des candidats')
    } finally {
      setLoading(false)
    }
  }

  // Écouter les changements en temps réel
  useEffect(() => {
    loadCandidates()

    const subscription = candidateService.subscribeToCandidates((payload) => {
      console.log('Changement détecté:', payload)
      loadCandidates() // Recharger les données
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Gérer un vote
  const handleVote = async (candidate, voteCount) => {
    try {
      const paymentResult = await processPayment(candidate, voteCount)
      
      if (paymentResult.success) {
        // Mettre à jour les votes du candidat
        await candidateService.updateCandidateVotes(candidate.id, voteCount)
        
        // Enregistrer la transaction
        await voteService.recordVote({
          candidateId: candidate.id,
          candidateName: candidate.nom,
          voteCount: voteCount,
          amount: voteCount * 100,
          paymentData: paymentResult.data,
          transactionId: paymentResult.data.transactionId
        })
        
        toast.success(`${voteCount} votes ajoutés pour ${candidate.nom}!`)
      }
    } catch (error) {
      console.error('Erreur lors du vote:', error)
      toast.error('Erreur lors du traitement du vote')
    }
  }

  // Calculer les totaux
  const totalVotesFemmes = candidates.femmes.reduce((sum, candidate) => sum + candidate.votes, 0)
  const totalVotesHommes = candidates.hommes.reduce((sum, candidate) => sum + candidate.votes, 0)
  const totalVotes = totalVotesFemmes + totalVotesHommes

  const value = {
    candidates,
    votes,
    totalVotes,
    totalVotesFemmes,
    totalVotesHommes,
    handleVote,
    loading: loading || processing,
    error,
    refreshCandidates: loadCandidates
  }

  return (
    <VoteContext.Provider value={value}>
      {children}
    </VoteContext.Provider>
  )
}