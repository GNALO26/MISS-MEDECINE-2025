import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { VoteProvider } from './contexts/VoteContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import Header from './components/common/Header.jsx'
import Footer from './components/common/Footer.jsx'
import Home from './pages/Home.jsx'
import Candidates from './pages/Candidates.jsx'
import Vote from './pages/Vote.jsx'
import Admin from './pages/Admin.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  // AUCUN besoin d'initialisation - Supabase se connecte automatiquement et bien
  return (
    <AuthProvider>
      <VoteProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/candidates" element={<Candidates />} />
                <Route path="/vote" element={<Vote />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </Router>
      </VoteProvider>
    </AuthProvider>
  )
}

export default App