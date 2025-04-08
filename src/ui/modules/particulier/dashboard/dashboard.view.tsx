import React from 'react';
import { DeclarationDechet, StatistiquesParticulier } from '@/types/particulier';

import { Button } from '@/ui/design-system/button/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/design-system/card/card';

interface DashboardViewProps {
  declarations: DeclarationDechet[];
  statistiques: StatistiquesParticulier;
  loading: boolean;
  error: string | null;
  onNouvelleDeclaration: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  declarations,
  statistiques,
  loading,
  error,
  onNouvelleDeclaration
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <Button action={onNouvelleDeclaration} variant="accent">
          Nouvelle déclaration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Points totaux</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{statistiques.totalPoints}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Déchets déclarés</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{statistiques.dechetsDeclares}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Déchets validés</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{statistiques.dechetsValides}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Récompenses échangées</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{statistiques.recompensesEchangees}</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Historique des déclarations</h2>
        {declarations.length === 0 ? (
          <p className="text-gray-500">Aucune déclaration pour le moment</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Quantité</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Statut</th>
                  <th className="px-4 py-2">Points</th>
                </tr>
              </thead>
              <tbody>
                {declarations.map((declaration) => (
                  <tr key={declaration.id}>
                    <td className="px-4 py-2">{declaration.type}</td>
                    <td className="px-4 py-2">
                      {declaration.quantite} {declaration.unite}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(declaration.dateDeclaration).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          declaration.statut === 'valide'
                            ? 'bg-green-100 text-green-800'
                            : declaration.statut === 'en_attente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {declaration.statut}
                      </span>
                    </td>
                    <td className="px-4 py-2">{declaration.pointsGagnes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardView; 