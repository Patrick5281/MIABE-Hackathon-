import { useState, useEffect } from 'react';
import { Mission, StatutMission } from '@/types/collecteur';

interface UseCollecteurMissionsProps {
  statut?: StatutMission[];
  page?: number;
  limit?: number;
}

interface UseCollecteurMissionsReturn {
  missions: Mission[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  totalMissions: number;
  refetch: () => Promise<void>;
  accepterMission: (missionId: string) => Promise<void>;
  terminerMission: (missionId: string, donnees: {
    quantiteReelle: number;
    photos: File[];
    signature: string;
    commentaire?: string;
  }) => Promise<void>;
}

export const useCollecteurMissions = ({
  statut = ['en_attente', 'attribuee', 'en_cours'],
  page = 1,
  limit = 10
}: UseCollecteurMissionsProps = {}): UseCollecteurMissionsReturn => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalMissions, setTotalMissions] = useState(0);

  const fetchMissions = async () => {
    try {
      setLoading(true);
      // TODO: Implémenter l'appel API
      // const response = await fetch(`/api/collecteur/missions?statut=${statut.join(',')}&page=${page}&limit=${limit}`);
      // const data = await response.json();

      // Mock data pour le développement
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockMissions: Mission[] = Array.from({ length: 5 }, (_, index) => ({
        id: `mission-${index + 1}`,
        typeDechet: {
          id: 'carton',
          nom: 'Carton',
          description: 'Déchets carton',
          unite: 'kg'
        },
        quantiteEstimee: Math.floor(Math.random() * 100) + 10,
        unite: 'kg',
        adresseCollecte: {
          rue: `${Math.floor(Math.random() * 100)} rue de la Collecte`,
          codePostal: '75001',
          ville: 'Paris',
          pays: 'France'
        },
        dateCollectePrevue: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        dateLimite: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        contactClient: {
          nom: 'Client Test',
          telephone: '+33123456789',
          email: 'client@test.com',
          type: Math.random() > 0.5 ? 'particulier' : 'entreprise'
        },
        statut: statut[Math.floor(Math.random() * statut.length)],
        recompense: {
          points: Math.floor(Math.random() * 100) + 50,
          montant: Math.floor(Math.random() * 50) + 20
        }
      }));

      setMissions(mockMissions);
      setTotalPages(3);
      setTotalMissions(15);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des missions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, [page, limit, JSON.stringify(statut)]);

  const accepterMission = async (missionId: string) => {
    try {
      setLoading(true);
      // TODO: Implémenter l'appel API
      // await fetch(`/api/collecteur/missions/${missionId}/accepter`, { method: 'POST' });
      
      // Mock pour le développement
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMissions(prev => prev.map(mission => 
        mission.id === missionId 
          ? { ...mission, statut: 'attribuee' } 
          : mission
      ));
    } catch (err) {
      setError('Erreur lors de l\'acceptation de la mission');
    } finally {
      setLoading(false);
    }
  };

  const terminerMission = async (missionId: string, donnees: {
    quantiteReelle: number;
    photos: File[];
    signature: string;
    commentaire?: string;
  }) => {
    try {
      setLoading(true);
      // TODO: Implémenter l'appel API
      // const formData = new FormData();
      // formData.append('quantiteReelle', donnees.quantiteReelle.toString());
      // donnees.photos.forEach(photo => formData.append('photos', photo));
      // formData.append('signature', donnees.signature);
      // if (donnees.commentaire) formData.append('commentaire', donnees.commentaire);
      // await fetch(`/api/collecteur/missions/${missionId}/terminer`, {
      //   method: 'POST',
      //   body: formData
      // });

      // Mock pour le développement
      await new Promise(resolve => setTimeout(resolve, 500));

      setMissions(prev => prev.map(mission => 
        mission.id === missionId 
          ? { ...mission, statut: 'terminee' } 
          : mission
      ));
    } catch (err) {
      setError('Erreur lors de la finalisation de la mission');
    } finally {
      setLoading(false);
    }
  };

  return {
    missions,
    loading,
    error,
    totalPages,
    currentPage: page,
    totalMissions,
    refetch: fetchMissions,
    accepterMission,
    terminerMission
  };
}; 