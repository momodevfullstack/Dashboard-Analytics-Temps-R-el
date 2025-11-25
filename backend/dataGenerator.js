// Générateur de données pour le dashboard analytics

/**
 * Génère des métriques aléatoires réalistes pour le dashboard
 * @returns {Object} Objet contenant les métriques actuelles et l'historique
 */
export function generateMetrics() {
  // Générer les métriques principales
  const revenue = Math.floor(Math.random() * 50000) + 30000; // 30k - 80k€
  const orders = Math.floor(Math.random() * 100) + 50; // 50 - 150
  const activeUsers = Math.floor(Math.random() * 300) + 100; // 100 - 400
  const conversionRate = (Math.random() * 5 + 2).toFixed(2); // 2% - 7%

  // Générer l'historique des revenus sur 24h (par heure)
  const revenueHistory = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now);
    hour.setHours(hour.getHours() - i);
    
    revenueHistory.push({
      time: hour.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      hour: hour.getHours(),
      revenue: Math.floor(Math.random() * 5000) + 2000, // 2k - 7k€ par heure
    });
  }

  // Générer la répartition par catégorie
  const categories = [
    { name: 'Électronique', value: Math.floor(Math.random() * 30) + 20 },
    { name: 'Mode', value: Math.floor(Math.random() * 25) + 15 },
    { name: 'Maison', value: Math.floor(Math.random() * 20) + 10 },
    { name: 'Sport', value: Math.floor(Math.random() * 15) + 8 },
    { name: 'Autres', value: Math.floor(Math.random() * 10) + 5 },
  ];

  // Normaliser les valeurs pour qu'elles totalisent 100%
  const total = categories.reduce((sum, cat) => sum + cat.value, 0);
  categories.forEach(cat => {
    cat.value = Math.round((cat.value / total) * 100);
  });

  // Générer les dernières transactions
  const transactions = [];
  for (let i = 0; i < 5; i++) {
    const transactionTime = new Date(now);
    transactionTime.setMinutes(transactionTime.getMinutes() - i * 3);
    
    transactions.push({
      id: `TXN-${Date.now()}-${i}`,
      amount: Math.floor(Math.random() * 500) + 50, // 50€ - 550€
      time: transactionTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      category: categories[Math.floor(Math.random() * categories.length)].name,
    });
  }

  return {
    timestamp: new Date().toISOString(),
    metrics: {
      revenue,
      orders,
      activeUsers,
      conversionRate: parseFloat(conversionRate),
    },
    revenueHistory,
    categories,
    transactions,
  };
}

