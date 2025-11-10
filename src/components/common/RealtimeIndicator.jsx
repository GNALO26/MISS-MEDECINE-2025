import React, { useState, useEffect } from 'react';
import { useVote } from '../../contexts/VoteContext';

const RealtimeIndicator = () => {
  const { lastUpdate, updateCount, realtimeEnabled, setRealtimeEnabled } = useVote();
  const [isOnline, setIsOnline] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  // Vérifier la connexion internet
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Format de la date de dernière mise à jour
  const formatLastUpdate = () => {
    if (!lastUpdate) return 'Jamais';
    
    const now = new Date();
    const diff = now - lastUpdate;
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 5) return 'À l\'instant';
    if (seconds < 60) return `Il y a ${seconds} secondes`;
    if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} minutes`;
    
    return lastUpdate.toLocaleTimeString('fr-FR');
  };

  if (!realtimeEnabled) {
    return (
      <div className="fixed top-20 right-4 z-40">
        <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Temps réel désactivé</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Indicateur fixe */}
      <div className="fixed top-20 right-4 z-40">
        <div className={`px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 backdrop-blur-sm ${
          isOnline 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            isOnline ? 'bg-green-200' : 'bg-red-200'
          }`}></div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {isOnline ? 'En ligne' : 'Hors ligne'}
            </span>
            <span className="text-xs opacity-80">
              {formatLastUpdate()}
            </span>
          </div>
          <button
            onClick={() => setRealtimeEnabled(!realtimeEnabled)}
            className="ml-2 text-xs bg-black/20 hover:bg-black/30 px-2 py-1 rounded transition-colors"
            title={realtimeEnabled ? 'Désactiver temps réel' : 'Activer temps réel'}
          >
            {realtimeEnabled ? '🔴' : '⚪'}
          </button>
        </div>
      </div>

      {/* Notification de statut */}
      {showNotification && (
        <div className={`fixed top-32 right-4 z-40 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
          isOnline ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Connexion rétablie - Temps réel actif</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Hors ligne - Mise à jour manuelle</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Badge de mise à jour (apparaît brièvement) */}
      {updateCount > 0 && (
        <div className="fixed top-48 right-4 z-40 animate-bounce">
          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
            🔄 {updateCount}
          </div>
        </div>
      )}
    </>
  );
};

export default RealtimeIndicator;