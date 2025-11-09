import { useState, useEffect } from 'react'
import { db } from '../utils/firebase'
import { collection, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore'
import { toast } from 'react-hot-toast'

export const useCandidates = () => {
  const [candidates, setCandidates] = useState({ femmes: [], hommes: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Charger les candidats depuis Firebase
  const loadCandidates = async () => {
    try {
      setLoading(true)
      const candidatesRef = collection(db, 'candidates')
      const snapshot = await getDocs(candidatesRef)
      
      const candidatesData = { femmes: [], hommes: [] }
      snapshot.forEach(doc => {
        const candidate = { id: doc.id, ...doc.data() }
        if (candidate.categorie === 'femmes') {
          candidatesData.femmes.push(candidate)
        } else {
          candidatesData.hommes.push(candidate)
        }
      })
      
      setCandidates(candidatesData)
      setError(null)
    } catch (err) {
      console.error('Erreur lors du chargement des candidats:', err)
      setError('Impossible de charger les candidats')
      toast.error('Erreur de chargement des candidats')
    } finally {
      setLoading(false)
    }
  }

  // Mettre à jour les votes d'un candidat
  const updateCandidateVotes = async (candidateId, additionalVotes) => {
    try {
      const candidateRef = doc(db, 'candidates', candidateId)
      const candidate = [...candidates.femmes, ...candidates.hommes].find(c => c.id === candidateId)
      
      if (candidate) {
        const newVotes = candidate.votes + additionalVotes
        await updateDoc(candidateRef, {
          votes: newVotes,
          lastUpdated: new Date().toISOString()
        })
        
        // Mettre à jour le state local immédiatement
        setCandidates(prev => ({
          femmes: prev.femmes.map(c => 
            c.id === candidateId ? { ...c, votes: newVotes } : c
          ),
          hommes: prev.hommes.map(c =>
            c.id === candidateId ? { ...c, votes: newVotes } : c
          )
        }))
        
        return true
      }
      return false
    } catch (err) {
      console.error('Erreur lors de la mise à jour des votes:', err)
      toast.error('Erreur lors de la mise à jour des votes')
      return false
    }
  }

  // Écouter les changements en temps réel
  useEffect(() => {
    const candidatesRef = collection(db, 'candidates')
    
    const unsubscribe = onSnapshot(candidatesRef, (snapshot) => {
      const candidatesData = { femmes: [], hommes: [] }
      snapshot.forEach(doc => {
        const candidate = { id: doc.id, ...doc.data() }
        if (candidate.categorie === 'femmes') {
          candidatesData.femmes.push(candidate)
        } else {
          candidatesData.hommes.push(candidate)
        }
      })
      setCandidates(candidatesData)
    }, (err) => {
      console.error('Erreur de synchronisation:', err)
      setError('Erreur de synchronisation avec la base de données')
    })

    return () => unsubscribe()
  }, [])

  return {
    candidates,
    loading,
    error,
    updateCandidateVotes,
    refreshCandidates: loadCandidates
  }
}