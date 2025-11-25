# 🚀 Dashboard Analytics Temps Réel

Un dashboard analytics moderne avec mise à jour en temps réel via WebSocket, construit avec React, Recharts, Node.js et Express.

![Dashboard Preview](https://via.placeholder.com/800x400/1F2937/FFFFFF?text=Dashboard+Analytics)

## 📋 Fonctionnalités

- ✅ **Mise à jour en temps réel** : Les données se mettent à jour automatiquement toutes les 3 secondes
- ✅ **4 Métriques KPI** : Revenue, Commandes, Utilisateurs Actifs, Taux de Conversion
- ✅ **Graphiques interactifs** : 
  - Graphique linéaire des revenus sur 24h
  - Graphique en camembert de répartition par catégorie
- ✅ **Liste des transactions** : Affichage des 5 dernières transactions
- ✅ **Indicateur de connexion** : Statut visuel de la connexion WebSocket
- ✅ **Design moderne** : Interface sombre avec Tailwind CSS
- ✅ **Responsive** : Adapté à tous les écrans

## 🛠️ Stack Technologique

### Backend
- **Node.js** + **Express** : Serveur HTTP
- **WebSocket (ws)** : Communication en temps réel
- **CORS** : Gestion des requêtes cross-origin

### Frontend
- **React** : Framework UI
- **Vite** : Build tool et dev server
- **Recharts** : Bibliothèque de graphiques
- **Tailwind CSS** : Framework CSS utilitaire

## 📁 Structure du Projet

```
realtime-dashboard/
├── backend/
│   ├── server.js          # Serveur Express + WebSocket
│   ├── dataGenerator.js   # Générateur de données simulées
│   ├── package.json
│   └── .env               # Variables d'environnement
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── RevenueChart.jsx
│   │   │   └── ConnectionStatus.jsx
│   │   ├── hooks/
│   │   │   └── useWebSocket.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
└── README.md
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn

### 1. Installation du Backend

```bash
cd backend
npm install
```

### 2. Configuration Backend

Créez un fichier `.env` dans le dossier `backend/` :

```env
PORT=3001
NODE_ENV=development
```

### 3. Démarrer le Backend

```bash
cd backend
node server.js
```

Le serveur sera accessible sur `http://localhost:3001` et le WebSocket sur `ws://localhost:3001`

### 4. Installation du Frontend

```bash
cd frontend
npm install
```

### 5. Démarrer le Frontend

```bash
cd frontend
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📊 Données Affichées

### Métriques KPI
- **💰 Revenue** : 30 000€ - 80 000€
- **🛒 Orders** : 50 - 150 commandes
- **👥 Active Users** : 100 - 400 utilisateurs
- **📈 Conversion Rate** : 2% - 7%

### Graphiques
1. **Revenue Line Chart** : Évolution des ventes sur les 24 dernières heures
2. **Category Pie Chart** : Répartition des ventes par catégorie (Électronique, Mode, Maison, Sport, Autres)

### Transactions
- Liste des 5 dernières transactions avec montant, catégorie et heure

## 🌐 Déploiement

### Backend sur Railway

1. **Créer un compte Railway** : [railway.app](https://railway.app)

2. **Connecter votre repository GitHub**

3. **Configurer le projet** :
   - **Root Directory** : `backend`
   - **Build Command** : `npm install`
   - **Start Command** : `node server.js`

4. **Variables d'environnement** :
   ```
   PORT=3001
   NODE_ENV=production
   ```

5. **Noter l'URL fournie** : `wss://votre-app.railway.app`

### Frontend sur Vercel

1. **Créer un compte Vercel** : [vercel.com](https://vercel.com)

2. **Connecter votre repository GitHub**

3. **Configurer le projet** :
   - **Root Directory** : `frontend`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`

4. **Variables d'environnement** :
   ```
   VITE_WS_URL=wss://votre-app.railway.app
   ```

5. **Déployer** : Vercel déploiera automatiquement à chaque push

### Mise à jour de l'URL WebSocket

Dans `frontend/src/components/Dashboard.jsx`, modifiez :

```javascript
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
```

En production, utilisez la variable d'environnement `VITE_WS_URL` configurée sur Vercel.

## 🔧 Configuration

### Variables d'environnement Backend

| Variable | Description | Défaut |
|----------|-------------|--------|
| `PORT` | Port du serveur | `3001` |
| `NODE_ENV` | Environnement | `development` |

### Variables d'environnement Frontend

| Variable | Description | Défaut |
|----------|-------------|--------|
| `VITE_WS_URL` | URL du serveur WebSocket | `ws://localhost:3001` |

## 📝 Scripts Disponibles

### Backend
```bash
npm start      # Démarrer le serveur
npm run dev    # Démarrer en mode watch (si disponible)
```

### Frontend
```bash
npm run dev    # Démarrer le serveur de développement
npm run build  # Construire pour la production
npm run preview # Prévisualiser le build de production
```

## 🎨 Personnalisation

### Modifier les intervalles de données

Dans `backend/dataGenerator.js`, modifiez les plages de valeurs :

```javascript
const revenue = Math.floor(Math.random() * 50000) + 30000; // 30k - 80k€
```

### Modifier la fréquence de mise à jour

Dans `backend/server.js`, modifiez l'intervalle :

```javascript
setInterval(() => {
  // ...
}, 3000); // 3000ms = 3 secondes
```

### Personnaliser les couleurs

Dans `frontend/tailwind.config.js`, ajoutez vos couleurs personnalisées.

## 🐛 Dépannage

### Le WebSocket ne se connecte pas

1. Vérifiez que le backend est démarré
2. Vérifiez l'URL WebSocket dans le frontend
3. Vérifiez les logs du serveur backend

### Les données ne se mettent pas à jour

1. Vérifiez l'indicateur de connexion (coin supérieur droit)
2. Ouvrez la console du navigateur pour voir les erreurs
3. Vérifiez que le serveur envoie bien les données (logs backend)

### Erreurs CORS

Assurez-vous que `cors` est bien installé et configuré dans `backend/server.js`.

## 📄 Licence

MIT

## 👨‍💻 Auteur

Créé avec ❤️ pour un dashboard analytics en temps réel

---

**Note** : Ce projet utilise des données simulées. Pour une utilisation en production, remplacez `dataGenerator.js` par une connexion à une vraie base de données ou API.

