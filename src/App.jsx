import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { VoteProvider } from './contexts/VoteContext'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Candidates from './pages/Candidates'
import Vote from './pages/Vote'
import Admin from './pages/Admin'
import { Toaster } from 'react-hot-toast'
import './styles/index.css'

function App() {
  return (
    <AuthProvider>
      <VoteProvider>
        <Router>
          <div className="main-layout">
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