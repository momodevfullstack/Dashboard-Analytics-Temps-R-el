import React from 'react';

/**
 * Composant qui affiche le statut de la connexion WebSocket
 */
export function ConnectionStatus({ connected }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg shadow-lg border border-gray-700">
      <div
        className={`w-3 h-3 rounded-full ${
          connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        }`}
      />
      <span className="text-sm text-gray-300">
        {connected ? 'Connecté' : 'Déconnecté'}
      </span>
    </div>
  );
}

