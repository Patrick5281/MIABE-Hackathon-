import React, { useEffect, useState } from 'react';
import { Collecte } from '@/types/entreprise';
import CollectesView from './collectes.view';

const CollectesContainer: React.FC = () => {
  const [collectes, setCollectes] = useState<Collecte[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollectes = async () => {
      try {
        // TODO: Implémenter l'appel API
        // const response = await fetch('/api/entreprise/collectes');
        // const data = await response.json();

        // Mock data pour le développement
        const mockCollectes: Collecte[] = [
          {
            id: '1',
            dateCollecte: new Date().toISOString(),
            statut: 'en_attente',
            dechetId: '123',
            collecteurId: '456',
            entrepriseId: '789',
            adresseCollecte: '123 rue des Entreprises, 75001 Paris',
            commentaire: 'Collecte prévue dans la matinée'
          },
          {
            id: '2',
            dateCollecte: new Date(Date.now() - 86400000).toISOString(), // Hier
            statut: 'terminee',
            dechetId: '124',
            collecteurId: '456',
            entrepriseId: '789',
            adresseCollecte: '123 rue des Entreprises, 75001 Paris'
          }
        ];

        setCollectes(mockCollectes);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des collectes');
        setLoading(false);
      }
    };

    fetchCollectes();
  }, []);

  const handleContactCollecteur = async (collecteId: string) => {
    try {
      // TODO: Implémenter l'appel API pour contacter le collecteur
      console.log('Contacter le collecteur pour la collecte:', collecteId);
    } catch (err) {
      setError('Erreur lors de la prise de contact avec le collecteur');
    }
  };

  return (
    <CollectesView
      collectes={collectes}
      loading={loading}
      error={error}
      onContactCollecteur={handleContactCollecteur}
    />
  );
};

export default CollectesContainer; 