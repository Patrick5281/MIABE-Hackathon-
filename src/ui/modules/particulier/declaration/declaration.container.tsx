import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DeclarationForm from './declaration.form';
import DeclarationView from './declaration.view';
import { TypeDechet } from '@/types/particulier';

export const DeclarationContainer: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: {
    type: TypeDechet;
    quantite: number;
    unite: 'kg' | 'unite';
    photo?: File;
  }) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implémenter l'appel API réel
      // const formData = new FormData();
      // formData.append('type', data.type);
      // formData.append('quantite', data.quantite.toString());
      // formData.append('unite', data.unite);
      // if (data.photo) {
      //   formData.append('photo', data.photo);
      // }
      // 
      // const response = await fetch('/api/particulier/declaration', {
      //   method: 'POST',
      //   body: formData,
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Erreur lors de la déclaration');
      // }

      // Simulation de succès
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirection vers le dashboard
      router.push('/particulier/dashboard');
    } catch (err) {
      setError('Une erreur est survenue lors de la déclaration. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeclarationView>
      <DeclarationForm onSubmit={handleSubmit} loading={loading} />
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-lg">
          {error}
        </div>
      )}
    </DeclarationView>
  );
};

export default DeclarationContainer; 