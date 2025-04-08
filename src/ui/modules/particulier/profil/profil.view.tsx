import React, { useState } from 'react';
import { ProfilParticulier } from '@/types/particulier';
import { Loader2 } from 'lucide-react';
import { Button } from '@/ui/design-system/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/design-system/card/card';
import { Input } from '@/ui/design-system/forms/input'; 

interface ProfilViewProps {
  profil: ProfilParticulier | null;
  loading: boolean;
  error: string | null;
  onUpdateProfil: (data: Partial<ProfilParticulier>) => void;
}

const ProfilView: React.FC<ProfilViewProps> = ({
  profil,
  loading,
  error,
  onUpdateProfil,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfilParticulier>>({});

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

  if (!profil) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Profil non trouvé</div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfil(formData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Mon Profil</h1>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? 'outline' : 'default'}
          >
            {isEditing ? 'Annuler' : 'Modifier'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nom">Nom</label>
                    <Input
                      id="nom"
                      name="nom"
                      defaultValue={profil.nom}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="prenom">Prénom</label>
                    <Input
                      id="prenom"
                      name="prenom"
                      defaultValue={profil.prenom}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={profil.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="telephone">Téléphone</label>
                    <Input
                      id="telephone"
                      name="telephone"
                      defaultValue={profil.telephone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Enregistrer les modifications
                  </Button>
                </form>
              ) : (
                <div className="space-y-2">
                  <p><span className="font-semibold">Nom:</span> {profil.nom}</p>
                  <p><span className="font-semibold">Prénom:</span> {profil.prenom}</p>
                  <p><span className="font-semibold">Email:</span> {profil.email}</p>
                  <p><span className="font-semibold">Téléphone:</span> {profil.telephone}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adresse</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="adresse">Adresse</label>
                    <Input
                      id="adresse"
                      name="adresse"
                      defaultValue={profil.adresse}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="codePostal">Code postal</label>
                    <Input
                      id="codePostal"
                      name="codePostal"
                      defaultValue={profil.codePostal}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="ville">Ville</label>
                    <Input
                      id="ville"
                      name="ville"
                      defaultValue={profil.ville}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-2">
                  <p><span className="font-semibold">Adresse:</span> {profil.adresse}</p>
                  <p><span className="font-semibold">Code postal:</span> {profil.codePostal}</p>
                  <p><span className="font-semibold">Ville:</span> {profil.ville}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{profil.statistiques.totalPoints}</p>
                <p className="text-gray-600">Points totaux</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{profil.statistiques.dechetsDeclares}</p>
                <p className="text-gray-600">Déchets déclarés</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{profil.statistiques.dechetsValides}</p>
                <p className="text-gray-600">Déchets validés</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{profil.statistiques.recompensesEchangees}</p>
                <p className="text-gray-600">Récompenses échangées</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilView; 