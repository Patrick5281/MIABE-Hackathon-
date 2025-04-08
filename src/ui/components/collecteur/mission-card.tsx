import React from 'react';
import { Mission } from '@/types/collecteur';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/design-system/card/card';
import { Button } from '@/ui/design-system/button/button';
import { MapPin, Calendar, Package, Euro, Award, Clock, User } from 'lucide-react';

interface MissionCardProps {
  mission: Mission;
  onAccepter?: (missionId: string) => Promise<void>;
  onTerminer?: (missionId: string) => void;
  loading?: boolean;
}

const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  onAccepter,
  onTerminer,
  loading = false
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatutColor = (statut: Mission['statut']) => {
    switch (statut) {
      case 'en_attente':
        return 'text-orange-500';
      case 'attribuee':
        return 'text-blue-500';
      case 'en_cours':
        return 'text-purple-500';
      case 'terminee':
        return 'text-green-500';
      case 'annulee':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatutBadgeColor = (statut: Mission['statut']) => {
    switch (statut) {
      case 'en_attente':
        return 'bg-orange-100 text-orange-800';
      case 'attribuee':
        return 'bg-blue-100 text-blue-800';
      case 'en_cours':
        return 'bg-purple-100 text-purple-800';
      case 'terminee':
        return 'bg-green-100 text-green-800';
      case 'annulee':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutLabel = (statut: Mission['statut']) => {
    switch (statut) {
      case 'en_attente':
        return 'En attente';
      case 'attribuee':
        return 'Attribuée';
      case 'en_cours':
        return 'En cours';
      case 'terminee':
        return 'Terminée';
      case 'annulee':
        return 'Annulée';
      default:
        return statut;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">
              Collecte de {mission.typeDechet.nom}
            </CardTitle>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatutBadgeColor(mission.statut)}`}>
              {getStatutLabel(mission.statut)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">{mission.recompense.points} points</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div className="text-sm">
              <p className="font-medium">{mission.adresseCollecte.ville}</p>
              <p className="text-gray-500">{mission.adresseCollecte.codePostal}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div className="text-sm">
              <p className="font-medium">Date prévue</p>
              <p className="text-gray-500">{formatDate(mission.dateCollectePrevue)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-gray-400" />
            <div className="text-sm">
              <p className="font-medium">Quantité estimée</p>
              <p className="text-gray-500">{mission.quantiteEstimee} {mission.unite}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Euro className="h-5 w-5 text-gray-400" />
            <div className="text-sm">
              <p className="font-medium">Rémunération</p>
              <p className="text-gray-500">{mission.recompense.montant}€</p>
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-2 text-sm">
          <User className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="font-medium">{mission.contactClient.nom}</p>
            <p className="text-gray-500">{mission.contactClient.type === 'particulier' ? 'Particulier' : 'Entreprise'}</p>
          </div>
        </div>

        {mission.notes && (
          <p className="text-sm text-gray-600 italic">
            Note : {mission.notes}
          </p>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>Date limite : {formatDate(mission.dateLimite)}</span>
          </div>
          <div className="space-x-2">
            {mission.statut === 'en_attente' && onAccepter && (
              <Button
                variant="accent"
                action={() => onAccepter(mission.id)}
                disabled={loading}
              >
                Accepter la mission
              </Button>
            )}
            {mission.statut === 'attribuee' && onTerminer && (
              <Button
                variant="primary"
                action={() => onTerminer(mission.id)}
                disabled={loading}
              >
                Marquer comme terminée
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MissionCard; 