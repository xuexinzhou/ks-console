import React from 'react';
import {
  Panel,
  DataTable,
  formatTime,
  StatusIndicator,
  Icon,
  transformRequestParams,
  Column,
} from '@ks-console/shared';
import styled from 'styled-components';
import { Field } from '@kubed/components';
import { useParams, Link } from 'react-router-dom';

export const FieldLabel = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  font-weight: 400;
  color: #79879c;
  max-width: 300px;
`;

function FaultRecord() {
  const { name, cluster } = useParams();
  const columns: Column[] = [
    {
      title: t('故障ID'),
      field: 'records_id',
    },
    {
      title: t('故障等级'),
      canHide: true,
      field: 'fault_priority',
      render: v => v ?? '-',
    },
    {
      title: t('故障时间'),
      field: 'search_word',
      searchable: true,
      render: (_v: string, row: any) => (row?.created_at ? formatTime(row?.created_at) : '-'),
    },
    {
      title: t('GPU UUID'),
      field: 'dev_gpu_uuid',
      canHide: true,
      width: 200,
      render: (v, row) => v || '-',
    },
    {
      title: t('错误码'),
      field: 'gpu_err_id',
      canHide: true,
      render: v => v || '-',
    },
    {
      title: t('XID'),
      canHide: true,
      field: 'gpu_xid',
      render: v => v ?? '-',
    },
    {
      title: t('错误描述'),
      field: 'gpu_err_desc',
      canHide: true,
      width: 200,
      render: v => v || '-',
    },
    {
      title: t('故障状态'),
      canHide: true,
      field: 'fault_status',
      render: (v: string) => (
        <StatusIndicator type={v === '1' ? 'ready' : 'deleted'}>
          {v === '1' ? '已处理' : '未处理'}
        </StatusIndicator>
      ),
    },
    {
      title: t('故障处理'),
      field: 'fault_treatment',
      canHide: true,
      render: (value: string) => (value ? value : '-'),
    },
    {
      title: t('故障建议'),
      canHide: true,
      width: 200,
      field: 'gpu_suggestions',
      render: (v: string) => (v ? v : '-'),
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
        parameters={{ gpu_node_id: name }}
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
