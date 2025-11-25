import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateMetrics } from './dataGenerator.js';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Route de santé pour vérifier que le serveur fonctionne
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Créer le serveur HTTP
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 WebSocket server ready on ws://localhost:${PORT}`);
});

// Créer le serveur WebSocket
const wss = new WebSocketServer({ server });

// Stocker les clients connectés
const clients = new Set();

// Gérer les connexions WebSocket
wss.on('connection', (ws) => {
  console.log('✅ New client connected');
  clients.add(ws);

  // Envoyer les données initiales immédiatement
  const initialData = generateMetrics();
  ws.send(JSON.stringify(initialData));

  // Gérer les déconnexions
  ws.on('close', () => {
    console.log('❌ Client disconnected');
    clients.delete(ws);
  });

  // Gérer les erreurs
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

// Envoyer des données toutes les 3 secondes à tous les clients connectés
setInterval(() => {
  if (clients.size > 0) {
    const data = generateMetrics();
    const message = JSON.stringify(data);
    
    clients.forEach((client) => {
      if (client.readyState === 1) { // WebSocket.OPEN
        client.send(message);
      }
    });
    
    console.log(`📊 Sent data to ${clients.size} client(s)`);
  }
}, 3000);

// Gérer l'arrêt propre du serveur
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    wss.close();
  });
});

