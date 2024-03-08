import React from 'react';
import { Panel, DataTable, StatusIndicator, Icon } from '@ks-console/shared';

function FaultRecord() {
  const columns = [
    {
      title: t('故障时间'),
      field: 'type',
      width: '10%',
      render: (type: any) => (
        <StatusIndicator type={type}>{t(`EVENT_${type.toUpperCase()}`)}</StatusIndicator>
      ),
    },
    {
      title: t('故障原因'),
      field: 'reason',
      width: '16%',
    },
    {
      title: t('故障处理'),
      field: 'age',
      width: '16%',
      render: (value: string) => {
        return <span dangerouslySetInnerHTML={{ __html: value }} />;
      },
    },
    {
      title: t('处理结果'),
      field: 'from',
      width: '18%',
    },
    {
      title: t('未修复原因'),
      field: 'message',
    },
    {
      title: t('故障恢复时间'),
      field: 'message2',
    },
    {
      title: t('故障保持时间'),
      field: 'message3',
    },
  ];

  return (
    <Panel title={t('Fault Log')}>
      <DataTable
        tableName=""
        rowKey=""
        url=""
        columns={columns}
        emptyOptions={{
          withoutTable: true,
          image: <Icon name="record" size={48} />,
          title: t('No record of faults found'),
        }}
      />
    </Panel>
  );
}

export default FaultRecord;
