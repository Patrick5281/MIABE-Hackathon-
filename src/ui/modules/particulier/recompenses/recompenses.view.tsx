import React from 'react';
import { Recompense } from '@/types/particulier';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/design-system/card/card';
import { Button } from '@/ui/design-system/button/button';

interface RecompensesViewProps {
  recompenses: Recompense[];
  pointsDisponibles: number;
  loading: boolean;
  error: string | null;
  onEchanger: (recompenseId: string) => void;
}

const RecompensesView: React.FC<RecompensesViewProps> = ({
  recompenses,
  pointsDisponibles,
  loading,
  error,
  onEchanger,
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Récompenses disponibles</h1>
        <p className="text-gray-600">
          Vous avez actuellement <span className="font-bold">{pointsDisponibles}</span> points à échanger.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recompenses.map((recompense) => (
          <Card key={recompense.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{recompense.nom}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <img
                src={recompense.imageUrl}
                alt={recompense.nom}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">{recompense.description}</p>
              <p className="text-lg font-semibold">
                {recompense.pointsNecessaires} points
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={!recompense.disponible || pointsDisponibles < recompense.pointsNecessaires}
                onClick={() => onEchanger(recompense.id)}
              >
                {!recompense.disponible
                  ? 'Indisponible'
                  : pointsDisponibles < recompense.pointsNecessaires
                  ? 'Points insuffisants'
                  : 'Échanger'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecompensesView; 