# ⚡ Guide de Démarrage Rapide

## 🚀 Démarrage en 5 minutes

### Étape 1 : Installer les dépendances Backend

```bash
cd backend
npm install
```

### Étape 2 : Créer le fichier .env (Backend)

Créez un fichier `.env` dans le dossier `backend/` avec :

```
PORT=3001
NODE_ENV=development
```

### Étape 3 : Démarrer le Backend

```bash
# Dans le dossier backend
node server.js
```

Vous devriez voir :
```
🚀 Server running on http://localhost:3001
📡 WebSocket server ready on ws://localhost:3001
```

### Étape 4 : Installer les dépendances Frontend

Ouvrez un **nouveau terminal** :

```bash
cd frontend
npm install
```

### Étape 5 : Démarrer le Frontend

```bash
# Dans le dossier frontend
npm run dev
```

L'application s'ouvrira automatiquement sur `http://localhost:5173`

## ✅ Vérification

1. ✅ Le backend affiche "Server running" dans la console
2. ✅ Le frontend s'ouvre dans le navigateur
3. ✅ L'indicateur de connexion (coin supérieur droit) est **vert**
4. ✅ Les métriques s'affichent et se mettent à jour toutes les 3 secondes

## 🐛 Problèmes courants

### "Cannot find module"
→ Exécutez `npm install` dans le dossier concerné

### "Port already in use"
→ Changez le PORT dans `backend/.env` ou arrêtez le processus qui utilise le port 3001

### WebSocket ne se connecte pas
→ Vérifiez que le backend est bien démarré avant le frontend

## 📝 Commandes utiles

```bash
# Backend
cd backend && node server.js

# Frontend (dans un autre terminal)
cd frontend && npm run dev

# Build production frontend
cd frontend && npm run build
```

