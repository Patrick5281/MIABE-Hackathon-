import React, { useState } from 'react';
import { TypeDechetEntreprise } from '@/types/entreprise';
import DeclarationView from './declaration.view';

interface DeclarationData {
  type: TypeDechetEntreprise;
  quantite: number;
  unite: 'kg' | 'tonne' | 'unite';
  description: string;
  photo?: File;
  localisation?: {
    lat: number;
    lng: number;
    adresse: string;
  };
}

const DeclarationContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: DeclarationData) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implémenter l'appel API
      // const response = await fetch('/api/entreprise/declarations', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });

      // if (!response.ok) {
      //   throw new Error('Erreur lors de la déclaration');
      // }

      // Simuler un délai pour le développement
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Rediriger vers le dashboard ou afficher un message de succès
      console.log('Déclaration soumise avec succès:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeclarationView
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default DeclarationContainer; 