import React from 'react';
import { Layout } from '@/ui/components/layout/layout';
import StatistiquesContainer from '@/ui/modules/entreprise/statistiques/statistiques.container';

const StatistiquesPage: React.FC = () => {
  return (
    <Layout withSidebar={true} isDisplayBreadcrumbs={true}>
      <StatistiquesContainer />
    </Layout>
  );
};

export default StatistiquesPage; 