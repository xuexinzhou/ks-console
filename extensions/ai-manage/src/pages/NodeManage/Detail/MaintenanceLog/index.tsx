import React from 'react';
import { useDisclosure } from '@kubed/hooks';
import { Panel, DataTable, StatusIndicator, Icon } from '@ks-console/shared';
import { Button } from '@kubed/components';
import CreateLogModal from './createLogModal';

function MaintenanceLog() {
  const createSecretModal = useDisclosure();

  const columns = [
    {
      title: t('时间'),
      field: 'type',
      width: '10%',
      render: (type: any) => (
        <StatusIndicator type={type}>{t(`EVENT_${type.toUpperCase()}`)}</StatusIndicator>
      ),
    },
    {
      title: t('记录人'),
      field: 'reason',
      width: '16%',
    },
    {
      title: t('描述'),
      field: 'from',
      width: '18%',
    },
  ];

  const renderTableActions = () => {
    return (
      <Button className="ml12" color="secondary" onClick={createSecretModal.open}>
        {t('Create New Log')}
      </Button>
    );
  };

  return (
    <>
      <Panel title={t('Maintenance Log')}>
        <DataTable
          tableName="maintenance-log"
          rowKey=""
          url=""
          columns={columns}
          toolbarRight={renderTableActions()}
          emptyOptions={{
            withoutTable: true,
            image: <Icon name="log" size={48} />,
            title: t('No maintenance logs found'),
            description: t('Please create a new log'),
            createButton: true,
            clickCreateButtonFn: () => createSecretModal.open(),
          }}
        />
      </Panel>
      <CreateLogModal visible={createSecretModal.isOpen} onCancel={createSecretModal.close} />
    </>
  );
}

export default MaintenanceLog;
