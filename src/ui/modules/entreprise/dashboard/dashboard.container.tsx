import React, { useEffect, useState } from 'react';
import { DeclarationDechetEntreprise, StatistiquesEntreprise } from '@/types/entreprise';
import DashboardView from './dashboard.view';

const DashboardContainer: React.FC = () => {
  const [declarations, setDeclarations] = useState<DeclarationDechetEntreprise[]>([]);
  const [statistiques, setStatistiques] = useState<StatistiquesEntreprise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Remplacer par de vraies appels API
        // const [declarationsData, statistiquesData] = await Promise.all([
        //   fetch('/api/entreprise/declarations').then(res => res.json()),
        //   fetch('/api/entreprise/statistiques').then(res => res.json())
        // ]);

        // Mock data pour le développement
        const mockDeclarations: DeclarationDechetEntreprise[] = [
          {
            id: '1',
            type: 'industriel',
            quantite: 1500,
            unite: 'kg',
            description: 'Déchets industriels standard',
            dateDeclaration: new Date().toISOString(),
            statut: 'valide',
            entrepriseId: '123'
          }
        ];

        const mockStatistiques: StatistiquesEntreprise = {
          totalDechetsKg: 15000,
          totalDechetsTraites: 120,
          totalCollectes: 45,
          impactEnvironnemental: {
            co2Evite: 2500,
            eauEconomisee: 15000,
            energieEconomisee: 7500
          },
          repartitionParType: {
            industriel: 40,
            chimique: 20,
            electronique: 15,
            plastique: 10,
            metal: 5,
            papier: 5,
            organique: 3,
            autre: 2
          },
          evolutionMensuelle: [
            { mois: '2024-01', quantite: 1200 },
            { mois: '2024-02', quantite: 1500 },
            { mois: '2024-03', quantite: 1800 }
          ]
        };

        setDeclarations(mockDeclarations);
        setStatistiques(mockStatistiques);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardView
      declarations={declarations}
      statistiques={statistiques}
      loading={loading}
      error={error}
    />
  );
};

export default DashboardContainer; 