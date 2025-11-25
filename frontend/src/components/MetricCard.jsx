import React from 'react';

/**
 * Composant pour afficher une carte de métrique avec icône, titre, valeur et variation
 */
export function MetricCard({ title, value, icon, previousValue, unit = '' }) {
  // Calculer la variation en pourcentage
  const variation = previousValue
    ? ((value - previousValue) / previousValue) * 100
    : 0;
  const isPositive = variation >= 0;

  // Formater la valeur selon le type
  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000) {
        return val.toLocaleString('fr-FR');
      }
      return val.toFixed(2);
    }
    return val;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        {previousValue && (
          <div
            className={`text-sm font-semibold px-2 py-1 rounded ${
              isPositive
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {isPositive ? '↑' : '↓'} {Math.abs(variation).toFixed(1)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white">
        {formatValue(value)}
        {unit && <span className="text-xl text-gray-400 ml-1">{unit}</span>}
      </p>
    </div>
  );
}

