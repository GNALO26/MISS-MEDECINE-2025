import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  paymentData,
  onSuccess,
  onError 
}) => {
  const [paymentStatus, setPaymentStatus] = useState('initial'); // initial, processing, success, error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPaymentStatus('initial');
      setErrorMessage('');
      initializePayment();
    }
  }, [isOpen]);

  const initializePayment = async () => {
    if (!window.Kkiapay) {
      setPaymentStatus('error');
      setErrorMessage('Service de paiement non disponible');
      return;
    }

    try {
      setPaymentStatus('processing');
      
      window.Kkiapay.init({
        key: import.meta.env.VITE_KKIAPAY_PUBLIC_KEY,
        amount: paymentData.amount,
        transaction_id: paymentData.transactionId,
        name: `Votes pour ${paymentData.candidateName}`,
        callback: async (response) => {
          if (response.status === 'SUCCESS') {
            setPaymentStatus('success');
            
            // Attendre un peu pour montrer le succès
            setTimeout(() => {
              onSuccess(response);
              onClose();
            }, 2000);
          } else {
            setPaymentStatus('error');
            setErrorMessage('Paiement échoué. Veuillez réessayer.');
          }
        },
        onClose: () => {
          if (paymentStatus === 'initial' || paymentStatus === 'processing') {
            setPaymentStatus('error');
            setErrorMessage('Paiement annulé');
          }
        }
      });
    } catch (error) {
      setPaymentStatus('error');
      setErrorMessage('Erreur d\'initialisation du paiement');
    }
  };

  if (!isOpen) return null;

  const getModalContent = () => {
    switch (paymentStatus) {
      case 'initial':
      case 'processing':
        return (
          <div className="text-center py-8">
            <LoadingSpinner size="large" text="Initialisation du paiement..." />
          </div>
        );

      case 'success':
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-charcoal-900 mb-2">
              Paiement Réussi !
            </h3>
            <p className="text-charcoal-600">
              Votre vote a été enregistré avec succès.
            </p>
          </div>
        );

      case 'error':
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-charcoal-900 mb-2">
              Paiement Échoué
            </h3>
            <p className="text-charcoal-600 mb-6">
              {errorMessage}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-charcoal-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Fermer
              </button>
              <button
                onClick={initializePayment}
                className="flex-1 btn-primary"
              >
                Réessayer
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto transform transition-all">
          {/* En-tête */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-charcoal-900">
                Paiement sécurisé
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-charcoal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenu */}
          <div className="px-6">
            {getModalContent()}
          </div>

          {/* Pied de page informatif */}
          {(paymentStatus === 'initial' || paymentStatus === 'processing') && (
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200">
              <div className="flex items-center space-x-3 text-sm text-charcoal-600">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Paiement 100% sécurisé via KkiaPay</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;