import React, { useEffect, useState } from 'react';
import { Recompense } from '@/types/particulier';
import RecompensesView from './recompenses.view';

export const RecompensesContainer: React.FC = () => {
  const [recompenses, setRecompenses] = useState<Recompense[]>([]);
  const [pointsDisponibles, setPointsDisponibles] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Implémenter les appels API réels
        // const [recompensesResponse, pointsResponse] = await Promise.all([
        //   fetch('/api/recompenses'),
        //   fetch('/api/particulier/points'),
        // ]);
        // 
        // const recompensesData = await recompensesResponse.json();
        // const pointsData = await pointsResponse.json();

        // Données temporaires pour le développement
        const mockRecompenses: Recompense[] = [
          {
            id: '1',
            nom: 'Carte cadeau Amazon',
            description: 'Carte cadeau de 10€ à utiliser sur Amazon',
            pointsNecessaires: 100,
            imageUrl: '/images/recompenses/amazon.jpg',
            disponible: true,
          },
          {
            id: '2',
            nom: 'Bon de réduction',
            description: 'Réduction de 15% dans votre magasin bio préféré',
            pointsNecessaires: 50,
            imageUrl: '/images/recompenses/bon-reduction.jpg',
            disponible: true,
          },
          {
            id: '3',
            nom: 'Don à une association',
            description: 'Faites un don de 5€ à une association de votre choix',
            pointsNecessaires: 25,
            imageUrl: '/images/recompenses/don.jpg',
            disponible: true,
          },
        ];

        setRecompenses(mockRecompenses);
        setPointsDisponibles(150); // Points temporaires
      } catch (err) {
        setError('Erreur lors du chargement des récompenses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEchanger = async (recompenseId: string) => {
    try {
      // TODO: Implémenter l'appel API réel
      // const response = await fetch('/api/recompenses/echanger', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ recompenseId }),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Erreur lors de l\'échange');
      // }

      // Mise à jour temporaire de l'interface
      const recompense = recompenses.find(r => r.id === recompenseId);
      if (recompense) {
        setPointsDisponibles(prev => prev - recompense.pointsNecessaires);
        setRecompenses(prev =>
          prev.map(r =>
            r.id === recompenseId ? { ...r, disponible: false } : r
          )
        );
      }
    } catch (err) {
      setError('Erreur lors de l\'échange de la récompense');
      console.error(err);
    }
  };

  return (
    <RecompensesView
      recompenses={recompenses}
      pointsDisponibles={pointsDisponibles}
      loading={loading}
      error={error}
      onEchanger={handleEchanger}
    />
  );
};

export default RecompensesContainer; 