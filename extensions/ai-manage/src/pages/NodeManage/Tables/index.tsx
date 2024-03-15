import React, { useState } from 'react';
import { useStore } from '@kubed/stook';

import MonitorTable from './monitorTable';
import GpuTable from './gpuTable';
import ListTable from './listTable';
import { TableContent, StyledNav, HiddendNav } from './styles';

function TableWrap() {
  const [tab, setTab] = useStore('current_tab', 'monitor');

  const pageTabs = [
    {
      id: 'monitor',
      label: t('Node Monitor'),
    },
    {
      id: 'list',
      label: t('Node List'),
    },
    {
      id: 'gpu',
      label: t('GPU Monitor'),
    },
  ];

  const navs = pageTabs.map(item => ({
    label: item.label,
    value: item.id,
  }));

  const defaultTabs = () => <HiddendNav className="mr12" data={navs} />;

  return (
    <TableContent>
      <StyledNav data={navs} value={tab} onChange={v => setTab(v)} />
      {tab === 'monitor' && <MonitorTable renderTabs={defaultTabs} />}
      {tab === 'list' && <ListTable renderTabs={defaultTabs} />}
      {tab === 'gpu' && <GpuTable renderTabs={defaultTabs} />}
    </TableContent>
  );
}

export default TableWrap;
