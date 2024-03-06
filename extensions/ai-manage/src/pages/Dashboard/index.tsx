import React from 'react';

import { Computing } from '@kubed/icons';
import { Banner } from '@kubed/components';

function Dashboard() {
  return (
    <div>
      <Banner
        className="mb12"
        icon={<Computing />}
        title={t('概览')}
        description={t('概览页')}
      />
    </div>
  );
}

export default Dashboard;
