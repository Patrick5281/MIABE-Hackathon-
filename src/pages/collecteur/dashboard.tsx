import React from 'react';
import { Layout } from '@/ui/components/layout/layout';
import StatsOverview from '@/ui/components/collecteur/stats-overview';
import MissionCard from '@/ui/components/collecteur/mission-card';
import { useCollecteurMissions } from '@/hooks/useCollecteurMissions';
import { useCollecteurProfil } from '@/hooks/useCollecteurProfil';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/design-system/card/card';
import { Button } from '@/ui/design-system/button/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

const DashboardPage: React.FC = () => {
  const {
    missions,
    loading: missionsLoading,
    error: missionsError,
    accepterMission
  } = useCollecteurMissions({
    limit: 5,
    statut: ['en_attente', 'attribuee']
  });

  const {
    profil,
    loading: profilLoading,
    error: profilError
  } = useCollecteurProfil();

  if (missionsLoading || profilLoading) {
    return (
      <Layout withSidebar={true}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (missionsError || profilError) {
    return (
      <Layout withSidebar={true}>
        <div className="flex items-center justify-center min-h-screen text-red-500">
          {missionsError || profilError}
        </div>
      </Layout>
    );
  }

  return (
    <Layout withSidebar={true}>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <div className="flex items-center space-x-4">
            <Link href="/collecteur/missions" passHref>
              <Button variant="secondary">
                Voir toutes les missions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Vue d'ensemble des statistiques */}
        {profil && (
          <StatsOverview statistiques={profil.statistiques} />
        )}

        {/* Missions en cours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Missions à venir</CardTitle>
                <Link href="/collecteur/missions" passHref>
                  <Button variant="link">
                    Voir tout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {missions.length > 0 ? (
                  missions.map((mission) => (
                    <MissionCard
                      key={mission.id}
                      mission={mission}
                      onAccepter={accepterMission}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Aucune mission en attente pour le moment
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liens rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/collecteur/missions" passHref>
            <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Missions disponibles</h3>
                <p className="text-gray-600">Consultez et acceptez de nouvelles missions</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/collecteur/historique" passHref>
            <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Historique</h3>
                <p className="text-gray-600">Consultez vos missions passées</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/collecteur/recompenses" passHref>
            <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Récompenses</h3>
                <p className="text-gray-600">Gérez vos points et récompenses</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/collecteur/profil" passHref>
            <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Mon profil</h3>
                <p className="text-gray-600">Gérez vos informations personnelles</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage; 