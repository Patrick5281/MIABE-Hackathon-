import React from 'react';
import { Layout } from '@/ui/components/layout/layout';
import DashboardContainer from '@/ui/modules/entreprise/dashboard/dashboard.container';

const DashboardPage: React.FC = () => {
  return (
    <Layout withSidebar={true} isDisplayBreadcrumbs={true}>
      <DashboardContainer />
    </Layout>
  );
};

export default DashboardPage; 