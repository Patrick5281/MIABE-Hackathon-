import React, { useEffect, useState } from 'react';
import { ProfilEntreprise } from '@/types/entreprise';
import ProfilView from './profil.view';

const ProfilContainer: React.FC = () => {
  const [profil, setProfil] = useState<ProfilEntreprise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        // TODO: Implémenter l'appel API
        // const response = await fetch('/api/entreprise/profil');
        // const data = await response.json();

        // Mock data pour le développement
        const mockProfil: ProfilEntreprise = {
          id: '123',
          raisonSociale: 'EcoTech Solutions',
          siret: '12345678901234',
          secteurActivite: 'Industrie manufacturière',
          email: 'contact@ecotech-solutions.fr',
          telephone: '+33123456789',
          adresse: {
            rue: '15 rue de l\'Innovation',
            codePostal: '75001',
            ville: 'Paris',
            pays: 'France'
          },
          certifications: [
            {
              nom: 'ISO 14001',
              dateObtention: '2023-01-15',
              dateExpiration: '2026-01-15'
            },
            {
              nom: 'ISO 9001',
              dateObtention: '2022-06-20',
              dateExpiration: '2025-06-20'
            }
          ],
          statistiques: {
            totalDechetsTraites: 25000,
            tauxRecyclage: 85,
            nombreCollectes: 150,
            scoreEnvironnemental: 92
          },
          documents: [
            {
              type: 'kbis',
              nom: 'kbis_ecotech.pdf',
              dateUpload: '2024-01-10',
              url: '/documents/kbis_ecotech.pdf'
            },
            {
              type: 'certification',
              nom: 'iso_14001.pdf',
              dateUpload: '2024-01-15',
              url: '/documents/iso_14001.pdf'
            }
          ]
        };

        setProfil(mockProfil);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement du profil');
        setLoading(false);
      }
    };

    fetchProfil();
  }, []);

  const handleUpdateProfil = async (updatedProfil: Partial<ProfilEntreprise>) => {
    try {
      setLoading(true);
      // TODO: Implémenter l'appel API
      // const response = await fetch('/api/entreprise/profil', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updatedProfil),
      // });
      // const data = await response.json();

      // Simuler un délai
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProfil(prev => prev ? { ...prev, ...updatedProfil } : null);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors de la mise à jour du profil');
      setLoading(false);
    }
  };

  const handleUploadDocument = async (file: File, type: string) => {
    try {
      setLoading(true);
      // TODO: Implémenter l'upload de fichier
      console.log('Upload document:', { file, type });
      
      // Simuler un délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoading(false);
    } catch (err) {
      setError('Erreur lors de l\'upload du document');
      setLoading(false);
    }
  };

  return (
    <ProfilView
      profil={profil}
      loading={loading}
      error={error}
      onUpdateProfil={handleUpdateProfil}
      onUploadDocument={handleUploadDocument}
    />
  );
};

export default ProfilContainer; 