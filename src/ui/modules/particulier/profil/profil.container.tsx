import React, { useEffect, useState } from 'react';
import { ProfilParticulier } from '@/types/particulier';
import ProfilView from './profil.view';

export const ProfilContainer: React.FC = () => {
  const [profil, setProfil] = useState<ProfilParticulier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        // TODO: Implémenter l'appel API réel
        // const response = await fetch('/api/particulier/profil');
        // const data = await response.json();

        // Données temporaires pour le développement
        const mockProfil: ProfilParticulier = {
          id: '1',
          nom: 'Dupont',
          prenom: 'Jean',
          email: 'jean.dupont@example.com',
          adresse: '123 rue de la Paix',
          codePostal: '75001',
          ville: 'Paris',
          telephone: '0123456789',
          dateInscription: new Date('2023-01-01'),
          statistiques: {
            totalPoints: 150,
            dechetsDeclares: 10,
            dechetsValides: 8,
            pointsGagnes: 150,
            recompensesEchangees: 2
          }
        };

        setProfil(mockProfil);
      } catch (err) {
        setError('Erreur lors du chargement du profil');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfil();
  }, []);

  const handleUpdateProfil = async (data: Partial<ProfilParticulier>) => {
    try {
      // TODO: Implémenter l'appel API réel
      // const response = await fetch('/api/particulier/profil', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Erreur lors de la mise à jour');
      // }

      // Mise à jour temporaire de l'interface
      setProfil(prev => prev ? { ...prev, ...data } : null);
    } catch (err) {
      setError('Erreur lors de la mise à jour du profil');
      console.error(err);
    }
  };

  return (
    <ProfilView
      profil={profil}
      loading={loading}
      error={error}
      onUpdateProfil={handleUpdateProfil}
    />
  );
};

export default ProfilContainer; 