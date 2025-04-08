import { useState, useEffect } from 'react';
import { ProfilCollecteur, Document } from '@/types/collecteur';

interface UseCollecteurProfilReturn {
  profil: ProfilCollecteur | null;
  loading: boolean;
  error: string | null;
  updateProfil: (data: Partial<ProfilCollecteur>) => Promise<void>;
  uploadDocument: (file: File, type: Document['type']) => Promise<void>;
  updateDisponibilites: (disponibilites: ProfilCollecteur['disponibilites']) => Promise<void>;
  updateZonesIntervention: (zones: ProfilCollecteur['zonesIntervention']) => Promise<void>;
}

export const useCollecteurProfil = (): UseCollecteurProfilReturn => {
  const [profil, setProfil] = useState<ProfilCollecteur | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        setLoading(true);
        // TODO: Implémenter l'appel API
        // const response = await fetch('/api/collecteur/profil');
        // const data = await response.json();

        // Mock data pour le développement
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockProfil: ProfilCollecteur = {
          id: 'collecteur-123',
          nom: 'Dupont',
          prenom: 'Jean',
          email: 'jean.dupont@collecteur.fr',
          telephone: '+33612345678',
          photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          adresse: {
            rue: '123 rue des Collecteurs',
            codePostal: '75001',
            ville: 'Paris',
            pays: 'France'
          },
          zonesIntervention: [
            {
              departement: 'Paris',
              codePostal: ['75001', '75002', '75003', '75004'],
              rayon: 10
            }
          ],
          documents: [
            {
              id: 'doc-1',
              type: 'permis',
              nom: 'Permis de conduire.pdf',
              dateUpload: '2024-01-01',
              dateExpiration: '2026-01-01',
              url: '/documents/permis.pdf',
              statut: 'valide'
            }
          ],
          vehicules: [
            {
              type: 'Camionnette',
              immatriculation: 'AB-123-CD',
              capacite: 1000
            }
          ],
          specialites: [
            {
              id: 'carton',
              nom: 'Carton',
              description: 'Déchets carton',
              unite: 'kg'
            }
          ],
          disponibilites: [
            {
              jour: 'lundi',
              heureDebut: '09:00',
              heureFin: '18:00'
            },
            {
              jour: 'mardi',
              heureDebut: '09:00',
              heureFin: '18:00'
            }
          ],
          statistiques: {
            totalCollectes: 150,
            totalDechetsCollectes: 7500,
            scoreEcologique: 92,
            tauxSatisfaction: 4.8,
            pointsCumules: 1500,
            revenusGeneres: 3000,
            collectesParMois: [
              { mois: '2024-01', nombre: 30 },
              { mois: '2024-02', nombre: 25 }
            ],
            dechetsParType: {
              carton: 3000,
              plastique: 2000,
              verre: 2500
            }
          },
          dateInscription: '2023-01-01',
          statut: 'actif',
          evaluationMoyenne: 4.8
        };

        setProfil(mockProfil);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfil();
  }, []);

  const updateProfil = async (data: Partial<ProfilCollecteur>) => {
    try {
      setLoading(true);
      // TODO: Implémenter l'appel API
      // await fetch('/api/collecteur/profil', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });

      // Mock pour le développement
      await new Promise(resolve => setTimeout(resolve, 500));
      setProfil(prev => prev ? { ...prev, ...data } : null);
    } catch (err) {
      setError('Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file: File, type: Document['type']) => {
    try {
      setLoading(true);
      // TODO: Implémenter l'appel API
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('type', type);
      // await fetch('/api/collecteur/documents', {
      //   method: 'POST',
      //   body: formData
      // });

      // Mock pour le développement
      await new Promise(resolve => setTimeout(resolve, 500));
      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        type,
        nom: file.name,
        dateUpload: new Date().toISOString(),
        url: URL.createObjectURL(file),
        statut: 'en_attente'
      };

      setProfil(prev => prev ? {
        ...prev,
        documents: [...prev.documents, newDocument]
      } : null);
    } catch (err) {
      setError('Erreur lors de l\'upload du document');
    } finally {
      setLoading(false);
    }
  };

  const updateDisponibilites = async (disponibilites: ProfilCollecteur['disponibilites']) => {
    try {
      setLoading(true);
      // TODO: Implémenter l'appel API
      // await fetch('/api/collecteur/disponibilites', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ disponibilites })
      // });

      // Mock pour le développement
      await new Promise(resolve => setTimeout(resolve, 500));
      setProfil(prev => prev ? { ...prev, disponibilites } : null);
    } catch (err) {
      setError('Erreur lors de la mise à jour des disponibilités');
    } finally {
      setLoading(false);
    }
  };

  const updateZonesIntervention = async (zones: ProfilCollecteur['zonesIntervention']) => {
    try {
      setLoading(true);
      // TODO: Implémenter l'appel API
      // await fetch('/api/collecteur/zones', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ zones })
      // });

      // Mock pour le développement
      await new Promise(resolve => setTimeout(resolve, 500));
      setProfil(prev => prev ? { ...prev, zonesIntervention: zones } : null);
    } catch (err) {
      setError('Erreur lors de la mise à jour des zones d\'intervention');
    } finally {
      setLoading(false);
    }
  };

  return {
    profil,
    loading,
    error,
    updateProfil,
    uploadDocument,
    updateDisponibilites,
    updateZonesIntervention
  };
}; 