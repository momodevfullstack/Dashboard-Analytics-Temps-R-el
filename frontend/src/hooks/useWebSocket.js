import { useState, useEffect, useRef } from 'react';

/**
 * Hook personnalisé pour gérer la connexion WebSocket
 * @param {string} url - URL du serveur WebSocket
 * @returns {Object} { data, connected, error }
 */
export function useWebSocket(url) {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000; // 3 secondes

  useEffect(() => {
    let isMounted = true;

    const connect = () => {
      try {
        // Nettoyer la connexion précédente si elle existe
        if (wsRef.current) {
          wsRef.current.close();
        }

        // Créer une nouvelle connexion WebSocket
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
          if (isMounted) {
            console.log('✅ WebSocket connected');
            setConnected(true);
            setError(null);
            reconnectAttempts.current = 0;
          }
        };

        ws.onmessage = (event) => {
          if (isMounted) {
            try {
              const newData = JSON.parse(event.data);
              setData(newData);
            } catch (err) {
              console.error('Error parsing WebSocket message:', err);
            }
          }
        };

        ws.onerror = (err) => {
          if (isMounted) {
            console.error('WebSocket error:', err);
            setError('Connection error');
            setConnected(false);
          }
        };

        ws.onclose = () => {
          if (isMounted) {
            console.log('WebSocket disconnected');
            setConnected(false);
            
            // Tentative de reconnexion automatique
            if (reconnectAttempts.current < maxReconnectAttempts) {
              reconnectAttempts.current += 1;
              console.log(`Attempting to reconnect (${reconnectAttempts.current}/${maxReconnectAttempts})...`);
              
              reconnectTimeoutRef.current = setTimeout(() => {
                connect();
              }, reconnectDelay);
            } else {
              setError('Max reconnection attempts reached');
            }
          }
        };
      } catch (err) {
        if (isMounted) {
          console.error('Error creating WebSocket:', err);
          setError(err.message);
          setConnected(false);
        }
      }
    };

    // Initialiser la connexion
    connect();

    // Nettoyage lors du démontage
    return () => {
      isMounted = false;
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);

  return { data, connected, error };
}

