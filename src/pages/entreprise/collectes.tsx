import React from 'react';
import { Layout } from '@/ui/components/layout/layout';
import CollectesContainer from '@/ui/modules/entreprise/collectes/collectes.container';

const CollectesPage: React.FC = () => {
  return (
    <Layout withSidebar={true} isDisplayBreadcrumbs={true}>
      <CollectesContainer />
    </Layout>
  );
};

export default CollectesPage; 