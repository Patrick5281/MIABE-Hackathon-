import React, { useEffect, useState } from 'react';
import { DeclarationDechet, StatistiquesParticulier } from '@/types/particulier';
import DashboardView from './dashboard.view';

export const DashboardContainer: React.FC = () => {
  const [declarations, setDeclarations] = useState<DeclarationDechet[]>([]);
  const [statistiques, setStatistiques] = useState<StatistiquesParticulier>({
    totalPoints: 0,
    dechetsDeclares: 0,
    dechetsValides: 0,
    pointsGagnes: 0,
    recompensesEchangees: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // TODO: Implémenter les appels API réels
        // const response = await fetch('/api/particulier/dashboard');
        // const data = await response.json();
        
        // Données temporaires pour le développement
        const mockData = {
          declarations: [],
          statistiques: {
            totalPoints: 150,
            dechetsDeclares: 10,
            dechetsValides: 8,
            pointsGagnes: 150,
            recompensesEchangees: 2
          }
        };
        
        setDeclarations(mockData.declarations);
        setStatistiques(mockData.statistiques);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleNouvelleDeclaration = () => {
    // TODO: Implémenter la navigation vers la page de déclaration
    console.log('Nouvelle déclaration');
  };

  return (
    <DashboardView
      declarations={declarations}
      statistiques={statistiques}
      loading={loading}
      error={error}
      onNouvelleDeclaration={handleNouvelleDeclaration}
    />
  );
};

export default DashboardContainer; 