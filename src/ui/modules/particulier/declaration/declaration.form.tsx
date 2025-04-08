import React, { useState } from 'react';
import { TypeDechet } from '@/types/particulier';
import { Button } from '@/ui/design-system/button/button';
import { Input } from '@/ui/design-system/forms/input';
import { Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/design-system/forms/select';

interface DeclarationFormProps {
  onSubmit: (data: {
    type: TypeDechet;
    quantite: number;
    unite: 'kg' | 'unite';
    photo?: File;
  }) => void;
  loading?: boolean;
}

const DeclarationForm: React.FC<DeclarationFormProps> = ({ onSubmit, loading = false }) => {
  const [type, setType] = useState<TypeDechet>('plastique');
  const [quantite, setQuantite] = useState<string>('');
  const [unite, setUnite] = useState<'kg' | 'unite'>('kg');
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      quantite: parseFloat(quantite),
      unite,
      photo: photo || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Select value={type} onChange={(e) => setType(e.target.value as TypeDechet)}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="plastique">Plastique</SelectItem>
            <SelectItem value="electronique">Électronique</SelectItem>
            <SelectItem value="verre">Verre</SelectItem>
            <SelectItem value="papier">Papier</SelectItem>
            <SelectItem value="metal">Métal</SelectItem>
            <SelectItem value="organique">Organique</SelectItem>
            <SelectItem value="autre">Autre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="Quantité"
            type="number"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            min="0"
            step="0.1"
            required={true}
            id="quantite"
          />
        </div>

        <div>
          <Select value={unite} onChange={(e) => setUnite(e.target.value as 'kg' | 'unite')}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une unité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilogrammes</SelectItem>
              <SelectItem value="unite">Unités</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <div className="mt-2">
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <label
            htmlFor="photo"
            className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="max-h-full max-w-full" />
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-sm text-gray-500">Cliquez pour télécharger une photo</span>
              </div>
            )}
          </label>
        </div>
      </div>

      <Button type="submit" fullwith={true} disabled={loading}>
        {loading ? 'Envoi en cours...' : 'Déclarer le déchet'}
      </Button>
    </form>
  );
};

export default DeclarationForm; 