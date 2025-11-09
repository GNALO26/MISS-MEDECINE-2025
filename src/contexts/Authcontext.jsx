import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { adminService } from '../services/adminService'
import { toast } from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier la session active
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        setUser(session.user)
        const userIsAdmin = await adminService.isAdmin(session.user.email)
        setIsAdmin(userIsAdmin)
      }
      
      setLoading(false)
    }

    getSession()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          const userIsAdmin = await adminService.isAdmin(session.user.email)
          setIsAdmin(userIsAdmin)
          
          if (userIsAdmin) {
            toast.success('Connexion admin réussie!')
          }
        } else {
          setUser(null)
          setIsAdmin(false)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      if (data.user) {
        const userIsAdmin = await adminService.isAdmin(data.user.email)
        
        if (userIsAdmin) {
          return true
        } else {
          await supabase.auth.signOut()
          toast.error('Accès réservé aux administrateurs')
          return false
        }
      }
      
      return false
    } catch (error) {
      console.error('Erreur de connexion:', error)
      toast.error('Email ou mot de passe incorrect')
      return false
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      toast.success('Déconnexion réussie')
    } catch (error) {
      console.error('Erreur de déconnexion:', error)
    }
  }

  const value = {
    isAdmin,
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}