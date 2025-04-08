import React from 'react';
import { Layout } from '@/ui/components/layout/layout';
import ProfilContainer from '@/ui/modules/entreprise/profil/profil.container';

const ProfilPage: React.FC = () => {
  return (
    <Layout withSidebar={true} isDisplayBreadcrumbs={true}>
      <ProfilContainer />
    </Layout>
  );
};

export default ProfilPage; 