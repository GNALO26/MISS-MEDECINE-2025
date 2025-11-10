import { useState } from 'react';
import { voteService } from '../services/voteService';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const processPayment = async (paymentData) => {
    setLoading(true);
    setError(null);

    try {
      // Intégration avec KkiaPay
      await loadKkiaPayScript();
      
      const transaction = await voteService.processVote(paymentData);
      
      // Ouvrir le widget de paiement KkiaPay
      return await openKkiaPayWidget({
        amount: paymentData.amount,
        transactionId: transaction.id,
        candidateName: paymentData.candidateName
      });
      
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loadKkiaPayScript = () => {
    return new Promise((resolve, reject) => {
      if (window.Kkiapay) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.kkiapay.me/k.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const openKkiaPayWidget = (paymentConfig) => {
    return new Promise((resolve) => {
      window.Kkiapay.init({
        key: import.meta.env.VITE_KKIAPAY_PUBLIC_KEY,
        amount: paymentConfig.amount,
        transaction_id: paymentConfig.transactionId,
        name: `Votes pour ${paymentConfig.candidateName}`,
        callback: (response) => {
          if (response.status === 'SUCCESS') {
            // Confirmer le paiement avec le backend
            voteService.confirmVote(paymentConfig.transactionId, response.transaction_id);
            resolve(true);
          } else {
            resolve(false);
          }
        },
        onClose: () => resolve(false)
      });
    });
  };

  return {
    processPayment,
    loading,
    error
  };
};