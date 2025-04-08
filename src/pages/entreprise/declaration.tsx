import React from 'react';
import { Layout } from '@/ui/components/layout/layout';
import DeclarationContainer from '@/ui/modules/entreprise/declaration/declaration.container';

const DeclarationPage: React.FC = () => {
  return (
    <Layout withSidebar={true} isDisplayBreadcrumbs={true}>
      <DeclarationContainer />
    </Layout>
  );
};

export default DeclarationPage; 