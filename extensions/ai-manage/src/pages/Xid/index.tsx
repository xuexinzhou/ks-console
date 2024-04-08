import React from 'react';
import { Banner } from '@kubed/components';
import { Nodes } from '@kubed/icons';

export default function XidRecord() {
  return (
    <div>
       <Banner
        className="mb12"
        icon={<Nodes />}
        title={t('Node Manage')}
        description={t('Node Desc')}
      />
    </div>
  )
}
