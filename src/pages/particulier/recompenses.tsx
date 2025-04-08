import React from 'react';
import RecompensesContainer from '@/ui/modules/particulier/recompenses/recompenses.container';
import { Layout } from '@/ui/components/layout/layout';

const RecompensesPage: React.FC = () => {
  return (
    <Layout withSidebar={true} isDisplayBreadcrumbs={true}>
      <RecompensesContainer />
    </Layout>
  );
};

export default RecompensesPage; 