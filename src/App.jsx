import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { VoteProvider } from './contexts/VoteContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Candidates from './pages/Candidates';
import Vote from './pages/Vote';
import Admin from './pages/Admin';
import Success from './pages/Success';
import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <VoteProvider>
        <Router>
          <div className="App min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/candidates" element={<Candidates />} />
                <Route path="/vote" element={<Vote />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/success" element={<Success />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </VoteProvider>
    </AuthProvider>
  );
}

export default App;