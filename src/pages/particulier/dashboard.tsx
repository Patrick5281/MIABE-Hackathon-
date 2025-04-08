import React from 'react';
import DashboardContainer from '@/ui/modules/particulier/dashboard/dashboard.container';
import { Layout } from '@/ui/components/layout/layout'; 

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <DashboardContainer />
    </Layout>
  );
};

export default DashboardPage; 