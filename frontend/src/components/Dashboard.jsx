import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { ConnectionStatus } from './ConnectionStatus';
import { MetricCard } from './MetricCard';
import { RevenueChart, CategoryChart } from './RevenueChart';

// URL du WebSocket (à changer en production)
const WS_URL =
  import.meta.env.VITE_WS_URL || 'ws://localhost:3001';

/**
 * Composant principal du Dashboard
 */
export function Dashboard() {
  const { data, connected } = useWebSocket(WS_URL);
  const [previousMetrics, setPreviousMetrics] = useState(null);

  // Sauvegarder les métriques précédentes pour calculer les variations
  useEffect(() => {
    if (data?.metrics) {
      setPreviousMetrics((prev) => {
        if (prev) {
          return prev;
        }
        return data.metrics;
      });
    }
  }, [data]);

  // Mettre à jour les métriques précédentes après un délai
  useEffect(() => {
    if (data?.metrics && previousMetrics) {
      const timer = setTimeout(() => {
        setPreviousMetrics(data.metrics);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [data, previousMetrics]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Connexion au serveur...</div>
      </div>
    );
  }

  const { metrics, transactions } = data;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <ConnectionStatus connected={connected} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard Analytics</h1>
        <p className="text-gray-400">Mise à jour en temps réel</p>
      </div>

      {/* Métriques KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Revenue"
          value={metrics.revenue}
          icon="💰"
          previousValue={previousMetrics?.revenue}
          unit="€"
        />
        <MetricCard
          title="Commandes"
          value={metrics.orders}
          icon="🛒"
          previousValue={previousMetrics?.orders}
        />
        <MetricCard
          title="Utilisateurs Actifs"
          value={metrics.activeUsers}
          icon="👥"
          previousValue={previousMetrics?.activeUsers}
        />
        <MetricCard
          title="Taux de Conversion"
          value={metrics.conversionRate}
          icon="📈"
          previousValue={previousMetrics?.conversionRate}
          unit="%"
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart data={data} />
        <CategoryChart data={data} />
      </div>

      {/* Liste des transactions */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4">
          Dernières Transactions
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  ID
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Montant
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Catégorie
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Heure
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-300">{transaction.id}</td>
                  <td className="py-3 px-4 text-green-400 font-semibold">
                    {transaction.amount}€
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {transaction.category}
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {transaction.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

