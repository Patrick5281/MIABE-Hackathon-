import React from 'react';

interface DeclarationViewProps {
  children: React.ReactNode;
}

const DeclarationView: React.FC<DeclarationViewProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Déclarer un déchet</h1>
          <p className="text-gray-600">
            Remplissez le formulaire ci-dessous pour déclarer vos déchets et gagner des points.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DeclarationView; 