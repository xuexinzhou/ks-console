import React from 'react';
import {
  Panel,
  DataTable,
  formatTime,
  StatusIndicator,
  Icon,
  transformRequestParams,
} from '@ks-console/shared';
import { useParams } from 'react-router-dom';

function FaultRecord() {
  const { name } = useParams();
  const columns = [
    {
      title: t('故障时间'),
      field: 'search_word',
      searchable: true,
      render: (_v: string, row: any) => (row?.created_at ? formatTime(row?.created_at) : '-'),
    },
    {
      title: t('故障原因'),
      canHide: true,
      field: 'fault_reason',
    },
    {
      title: t('故障处理'),
      field: 'solution',
      canHide: true,
      render: (value: string) => {
        return <span dangerouslySetInnerHTML={{ __html: value }} />;
      },
    },
    {
      title: t('处理结果'),
      canHide: true,
      field: 'fault_status',
      render: (v: string) => (
        <StatusIndicator type={v === '1' ? 'ready' : 'deleted'}>
          {v === '1' ? '已修复' : '未修复'}
        </StatusIndicator>
      ),
    },
    {
      title: t('未修复原因'),
      canHide: true,
      field: 'unresolved_reason',
    },
    {
      title: t('故障恢复时间'),
      canHide: true,
      field: 'recovery_time',
      render: (v: string) => (v ? formatTime(v) : '-'),
    },
    {
      title: t('故障保持时间'),
      canHide: true,
      field: 'fault_time',
      render: (v: number) => {
        if (v && v > 24) {
          return `超过24小时`;
        }
        return `${v ?? '-'}小时`;
      },
    },
  ];

  const formatServerData = (serverData: Record<string, any>) => {
    return {
      items: serverData.data || [],
      totalItems: serverData.counts,
    };
  };

  return (
    <Panel title={t('Fault Log')}>
      <DataTable
        tableName="record"
        rowKey="dev_gpu_uuid"
        url="/kapis/aicp.kubesphere.io/v1/gpu/list_gpu_fault_record"
        transformRequestParams={params => {
          const p = transformRequestParams(params as any);
          return {
            ...p,
            gpu_node_id: name,
          };
        }}
        columns={columns}
        serverDataFormat={formatServerData}
        simpleSearch
        emptyOptions={{
          withoutTable: true,
          image: <Icon name="record" size={48} />,
          title: t('No record of faults found'),
        }}
        showFooter={false}
      />
    </Panel>
  );
}

export default FaultRecord;
