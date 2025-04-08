import React, { useState } from 'react';
import { ProfilEntreprise } from '@/types/entreprise';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/design-system/card/card';
import { Input } from '@/ui/design-system/forms/input';
import { Button } from '@/ui/design-system/button/button';
import { Loader2, Building2, Mail, Phone, MapPin, Award, FileText, Upload, TrendingUp, Recycle, Truck, Star } from 'lucide-react';

interface ProfilViewProps {
  profil: ProfilEntreprise | null;
  loading: boolean;
  error: string | null;
  onUpdateProfil: (data: Partial<ProfilEntreprise>) => Promise<void>;
  onUploadDocument: (file: File, type: string) => Promise<void>;
}

const ProfilView: React.FC<ProfilViewProps> = ({
  profil,
  loading,
  error,
  onUpdateProfil,
  onUploadDocument
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfilEntreprise>>(profil || {});

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
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateProfil(formData);
    setIsEditing(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      await onUploadDocument(file, type);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Profil de l'entreprise</h1>
        <Button
          variant="accent"
          action={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Annuler' : 'Modifier le profil'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations principales */}
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <Building2 className="h-5 w-5 text-gray-500" />
                {isEditing ? (
                  <Input
                    label="Raison sociale"
                    value={formData.raisonSociale || ''}
                    onChange={(e) => setFormData({ ...formData, raisonSociale: e.target.value })}
                  />
                ) : (
                  <div>
                    <p className="text-sm text-gray-500">Raison sociale</p>
                    <p className="font-medium">{profil.raisonSociale}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <FileText className="h-5 w-5 text-gray-500" />
                {isEditing ? (
                  <Input
                    label="SIRET"
                    value={formData.siret || ''}
                    onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                  />
                ) : (
                  <div>
                    <p className="text-sm text-gray-500">SIRET</p>
                    <p className="font-medium">{profil.siret}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-gray-500" />
                {isEditing ? (
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{profil.email}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-gray-500" />
                {isEditing ? (
                  <Input
                    label="Téléphone"
                    value={formData.telephone || ''}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  />
                ) : (
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="font-medium">{profil.telephone}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                {isEditing ? (
                  <div className="flex-1 space-y-4">
                    <Input
                      label="Rue"
                      value={formData.adresse?.rue || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        adresse: { ...formData.adresse, rue: e.target.value }
                      })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Code postal"
                        value={formData.adresse?.codePostal || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          adresse: { ...formData.adresse, codePostal: e.target.value }
                        })}
                      />
                      <Input
                        label="Ville"
                        value={formData.adresse?.ville || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          adresse: { ...formData.adresse, ville: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-500">Adresse</p>
                    <p className="font-medium">
                      {profil.adresse.rue}<br />
                      {profil.adresse.codePostal} {profil.adresse.ville}<br />
                      {profil.adresse.pays}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profil.certifications.map((certification, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Award className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="font-medium">{certification.nom}</p>
                      <p className="text-sm text-gray-500">
                        Obtenue le {formatDate(certification.dateObtention)} - 
                        Expire le {formatDate(certification.dateExpiration)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Documents légaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profil.documents.map((document, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="font-medium">{document.nom}</p>
                      <p className="text-sm text-gray-500">
                        Uploadé le {formatDate(document.dateUpload)}
                      </p>
                    </div>
                  </div>
                  <a
                    href={document.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark"
                  >
                    Télécharger
                  </a>
                </div>
              ))}

              <div className="mt-4">
                <label className="block">
                  <span className="sr-only">Ajouter un document</span>
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-white
                      hover:file:bg-primary-dark"
                    onChange={(e) => handleFileUpload(e, 'document')}
                  />
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <Card>
          <CardHeader>
            <CardTitle>Performance environnementale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
                <p className="text-lg font-semibold">Déchets traités</p>
                <p className="text-2xl font-bold text-green-600">
                  {profil.statistiques.totalDechetsTraites.toLocaleString()} kg
                </p>
              </div>

              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <Recycle className="h-8 w-8 text-blue-500 mb-2" />
                <p className="text-lg font-semibold">Taux de recyclage</p>
                <p className="text-2xl font-bold text-blue-600">
                  {profil.statistiques.tauxRecyclage}%
                </p>
              </div>

              <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                <Truck className="h-8 w-8 text-purple-500 mb-2" />
                <p className="text-lg font-semibold">Collectes réalisées</p>
                <p className="text-2xl font-bold text-purple-600">
                  {profil.statistiques.nombreCollectes}
                </p>
              </div>

              <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg">
                <Star className="h-8 w-8 text-yellow-500 mb-2" />
                <p className="text-lg font-semibold">Score environnemental</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {profil.statistiques.scoreEnvironnemental}/100
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {isEditing && (
          <div className="flex justify-end space-x-4">
            <Button
              variant="secondary"
              action={() => setIsEditing(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="accent"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Enregistrement...
                </>
              ) : (
                'Enregistrer les modifications'
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilView; 