import React, { useEffect, useState } from 'react';
import { StatistiquesEntreprise } from '@/types/entreprise';
import StatistiquesView from './statistiques.view';

const StatistiquesContainer: React.FC = () => {
  const [statistiques, setStatistiques] = useState<StatistiquesEntreprise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistiques = async () => {
      try {
        // TODO: Implémenter l'appel API
        // const response = await fetch('/api/entreprise/statistiques');
        // const data = await response.json();

        // Mock data pour le développement
        const mockStatistiques: StatistiquesEntreprise = {
          totalDechetsKg: 25000,
          totalDechetsTraites: 180,
          totalCollectes: 65,
          impactEnvironnemental: {
            co2Evite: 5000,
            eauEconomisee: 25000,
            energieEconomisee: 12000
          },
          repartitionParType: {
            industriel: 45,
            chimique: 15,
            electronique: 10,
            plastique: 10,
            metal: 8,
            papier: 7,
            organique: 3,
            autre: 2
          },
          evolutionMensuelle: [
            { mois: '2024-01', quantite: 7500 },
            { mois: '2024-02', quantite: 8200 },
            { mois: '2024-03', quantite: 9300 }
          ]
        };

        setStatistiques(mockStatistiques);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des statistiques');
        setLoading(false);
      }
    };

    fetchStatistiques();
  }, []);

  return (
    <StatistiquesView
      statistiques={statistiques}
      loading={loading}
      error={error}
    />
  );
};

export default StatistiquesContainer; 