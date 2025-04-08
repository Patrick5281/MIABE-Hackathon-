import React from 'react';
import { useForm } from 'react-hook-form';
import { TypeDechetEntreprise } from '@/types/entreprise';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/design-system/card/card';
import { Input } from '@/ui/design-system/forms/input';
import { Button } from '@/ui/design-system/button/button';
import { Select } from '@/ui/design-system/forms/select';
import { Upload, MapPin, Loader2 } from 'lucide-react';

interface DeclarationViewProps {
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const DeclarationView: React.FC<DeclarationViewProps> = ({
  onSubmit,
  loading,
  error
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const watchPhoto = watch('photo');

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Déclarer un déchet</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Select
                  label="Type de déchet"
                  {...register('type', { required: 'Ce champ est requis' })}
                  error={errors.type?.message}
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="industriel">Industriel</option>
                  <option value="chimique">Chimique</option>
                  <option value="electronique">Électronique</option>
                  <option value="plastique">Plastique</option>
                  <option value="metal">Métal</option>
                  <option value="papier">Papier</option>
                  <option value="organique">Organique</option>
                  <option value="autre">Autre</option>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Quantité"
                  type="number"
                  {...register('quantite', {
                    required: 'Ce champ est requis',
                    min: { value: 0, message: 'La quantité doit être positive' }
                  })}
                  error={errors.quantite?.message}
                />

                <Select
                  label="Unité"
                  {...register('unite', { required: 'Ce champ est requis' })}
                  error={errors.unite?.message}
                >
                  <option value="">Sélectionnez une unité</option>
                  <option value="kg">Kilogrammes</option>
                  <option value="tonne">Tonnes</option>
                  <option value="unite">Unités</option>
                </Select>
              </div>
            </div>

            <div>
              <Input
                label="Description"
                {...register('description', {
                  required: 'Ce champ est requis',
                  minLength: {
                    value: 10,
                    message: 'La description doit faire au moins 10 caractères'
                  }
                })}
                error={errors.description?.message}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Photo (optionnelle)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="photo"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                    >
                      <span>Télécharger un fichier</span>
                      <input
                        id="photo"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        {...register('photo')}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Localisation
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Adresse de collecte"
                  {...register('adresse')}
                  error={errors.adresse?.message}
                />
                <Button
                  type="button"
                  variant="secondary"
                  action={() => {
                    // TODO: Implémenter la géolocalisation
                    console.log('Géolocalisation');
                  }}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                variant="accent"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Envoi en cours...
                  </>
                ) : (
                  'Déclarer le déchet'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeclarationView; 