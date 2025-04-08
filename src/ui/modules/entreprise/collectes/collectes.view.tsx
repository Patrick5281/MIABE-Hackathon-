import React from 'react';
import { Collecte } from '@/types/entreprise';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/design-system/card/card';
import { Button } from '@/ui/design-system/button/button';
import { Loader2, MessageCircle, Calendar, MapPin } from 'lucide-react';

interface CollectesViewProps {
  collectes: Collecte[];
  loading: boolean;
  error: string | null;
  onContactCollecteur: (collecteId: string) => void;
}

const CollectesView: React.FC<CollectesViewProps> = ({
  collectes,
  loading,
  error,
  onContactCollecteur
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

  const getStatutBadgeClass = (statut: Collecte['statut']) => {
    switch (statut) {
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_cours':
        return 'bg-blue-100 text-blue-800';
      case 'terminee':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mes collectes</h1>

      <div className="grid gap-6">
        {collectes.map((collecte) => (
          <Card key={collecte.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">
                      {formatDate(collecte.dateCollecte)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span>{collecte.adresseCollecte}</span>
                  </div>

                  {collecte.commentaire && (
                    <div className="text-gray-600">
                      <p>{collecte.commentaire}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:items-end justify-between gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatutBadgeClass(
                      collecte.statut
                    )}`}
                  >
                    {collecte.statut.replace('_', ' ')}
                  </span>

                  {collecte.statut !== 'terminee' && (
                    <Button
                      variant="secondary"
                      action={() => onContactCollecteur(collecte.id)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contacter le collecteur
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {collectes.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Aucune collecte programmée pour le moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectesView; 