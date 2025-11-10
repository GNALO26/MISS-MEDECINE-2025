import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCandidates } from '../hooks/useCandidates';
import { usePayment } from '../hooks/usePayment';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Vote = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { candidates, loading } = useCandidates();
  const { processPayment, loading: paymentLoading } = usePayment();
  
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voteCount, setVoteCount] = useState(1);
  const [step, setStep] = useState(1); // 1: Sélection, 2: Confirmation
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const pricePerVote = 100;
  const totalAmount = voteCount * pricePerVote;

  // Pré-sélectionner le candidat depuis l'URL
  useEffect(() => {
    const candidateId = searchParams.get('candidate');
    if (candidateId && candidates.length > 0) {
      const candidate = candidates.find(c => c.id === parseInt(candidateId));
      if (candidate) {
        setSelectedCandidate(candidate);
        setStep(2);
      }
    }
  }, [searchParams, candidates]);

  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
    setStep(2);
    // Scroll vers la section confirmation
    setTimeout(() => {
      document.getElementById('confirmation-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleVoteCountChange = (value) => {
    const count = parseInt(value) || 1;
    setVoteCount(Math.max(1, Math.min(1000, count))); // Limite entre 1 et 1000 votes
  };

  const handlePayment = async () => {
    if (!selectedCandidate) return;

    const success = await processPayment({
      candidateId: selectedCandidate.id,
      candidateName: selectedCandidate.nom,
      voteCount: voteCount,
      amount: totalAmount
    });

    if (success) {
      navigate('/success', { 
        state: { 
          candidate: selectedCandidate, 
          voteCount: voteCount,
          amount: totalAmount
        } 
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* En-tête */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-4">
              Voter pour votre favori
            </h1>
            <p className="text-xl text-charcoal-600">
              Soutenez votre candidat préféré avec vos votes. Chaque vote compte !
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom py-16">
        {/* Indicateur d'étapes */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-gold-600' : 'text-gray-400'}`}>
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 ${
                step >= 1 ? 'border-gold-600 bg-gold-50' : 'border-gray-300'
              }`}>
                <span className="font-sans font-semibold">1</span>
              </div>
              <span className="font-sans text-sm font-medium">Choisir un candidat</span>
            </div>
            
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-gold-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-gold-600' : 'text-gray-400'}`}>
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 ${
                step >= 2 ? 'border-gold-600 bg-gold-50' : 'border-gray-300'
              }`}>
                <span className="font-sans font-semibold">2</span>
              </div>
              <span className="font-sans text-sm font-medium">Confirmer le vote</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Sélection du candidat */}
          <div className={`${step === 1 ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="font-serif text-3xl text-charcoal-900 mb-6">
                Sélectionnez un candidat
              </h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto pr-4 scrollbar-hide">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    onClick={() => handleCandidateSelect(candidate)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedCandidate?.id === candidate.id
                        ? 'border-gold-500 bg-gold-50 shadow-md'
                        : 'border-gray-200 hover:border-gold-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={candidate.photo}
                        alt={candidate.nom}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-serif text-lg text-charcoal-900">
                          {candidate.nom}
                        </h3>
                        <p className="text-charcoal-600 text-sm line-clamp-1">
                          {candidate.description}
                        </p>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                          candidate.categorie === 'Miss' 
                            ? 'bg-pink-100 text-pink-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {candidate.categorie}
                        </div>
                      </div>
                      <svg 
                        className={`w-6 h-6 transition-colors duration-300 ${
                          selectedCandidate?.id === candidate.id ? 'text-gold-600' : 'text-gray-400'
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Confirmation du vote */}
          <div 
            id="confirmation-section"
            className={`${step === 2 ? 'block' : 'hidden lg:block'}`}
          >
            {selectedCandidate && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-8">
                <h2 className="font-serif text-3xl text-charcoal-900 mb-6">
                  Confirmer votre vote
                </h2>

                {/* Candidat sélectionné */}
                <div className="bg-gold-50 rounded-xl p-6 mb-8 border border-gold-200">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedCandidate.photo}
                      alt={selectedCandidate.nom}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div>
                      <h3 className="font-serif text-2xl text-charcoal-900">
                        {selectedCandidate.nom}
                      </h3>
                      <p className="text-charcoal-600">
                        {selectedCandidate.description}
                      </p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                        selectedCandidate.categorie === 'Miss' 
                          ? 'bg-pink-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}>
                        {selectedCandidate.categorie}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sélection du nombre de votes */}
                <div className="mb-8">
                  <label className="block font-sans font-semibold text-charcoal-900 mb-4 text-lg">
                    Nombre de votes souhaités
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleVoteCountChange(voteCount - 1)}
                      disabled={voteCount <= 1}
                      className="w-12 h-12 rounded-full border-2 border-gold-500 text-gold-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold-500 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    
                    <div className="flex-1">
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        value={voteCount}
                        onChange={(e) => handleVoteCountChange(e.target.value)}
                        className="w-full px-4 py-4 text-center text-2xl font-bold border-2 border-gold-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <button
                      onClick={() => handleVoteCountChange(voteCount + 1)}
                      disabled={voteCount >= 1000}
                      className="w-12 h-12 rounded-full border-2 border-gold-500 text-gold-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold-500 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-center text-charcoal-500 mt-2">
                    Minimum 1 vote, maximum 1000 votes
                  </p>
                </div>

                {/* Résumé du paiement */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h4 className="font-sans font-semibold text-charcoal-900 mb-4 text-lg">
                    Récapitulatif
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-charcoal-600">
                      <span>Nombre de votes</span>
                      <span className="font-semibold">{voteCount} vote{voteCount > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between text-charcoal-600">
                      <span>Prix par vote</span>
                      <span className="font-semibold">{pricePerVote} FCFA</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3 flex justify-between text-lg font-bold text-charcoal-900">
                      <span>Total à payer</span>
                      <span className="text-gold-600">{totalAmount.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </div>

                {/* Bouton de paiement */}
                <button
                  onClick={handlePayment}
                  disabled={paymentLoading}
                  className="w-full btn-primary text-lg py-4 flex items-center justify-center"
                >
                  {paymentLoading ? (
                    <>
                      <LoadingSpinner />
                      <span className="ml-2">Traitement en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Payer {totalAmount.toLocaleString()} FCFA</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Information de sécurité */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <p className="text-green-800 text-sm font-medium">
                        Paiement 100% sécurisé
                      </p>
                      <p className="text-green-700 text-xs">
                        Vos informations de paiement sont cryptées et protégées
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;