import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Column,
  getDisplayName,
  getNodeStatus,
  StatusIndicator,
  getValueByUnit,
  hideGPUByLicense,
  useItemActions,
} from '@ks-console/shared';
import { Tooltip, Field } from '@kubed/components';
import { Nodes, Exclamation, Start, Stop, Trash, Terminal } from '@kubed/icons';
import { isEmpty, get } from 'lodash';

import { MetricTypes, toPercentage } from './contants';
import { FieldLabel, Taints, Resource } from './style';

interface ColumnsProps {
  cluster: string;
  monitorData?: Record<string, string>;
  renderItemAction: (value: string, row: any) => React.ReactNode;
}

const t = (arg: string) => window?.t?.(arg);

export const getColumns = ({ cluster, monitorData, renderItemAction }: ColumnsProps) => {
  const renderTaintsTip = (data: Record<string, string>[]) => (
    <div>
      <div>{t('TAINTS')}:</div>
      <div>
        {data.map(item => {
          const text = `${item.key}=${item.value || ''}:${item.effect}`;
          return (
            <div style={{ wordBreak: 'break-all' }} key={text}>
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );

  const getLastValue = (node: any, type: string, unit: string) => {
    const metricsData: Record<string, string> = monitorData || {};
    const result = get(metricsData[type], 'data.result') || [];
    const metrics = result.find((item: any) => get(item, 'metric.node') === node.name);
    return getValueByUnit(get(metrics, 'value[1]', 0), unit);
  };

  const getRecordMetrics = (record: any, configs: Record<string, any>[]) => {
    const metrics: Record<string, any> = {};
    configs.forEach(cfg => {
      metrics[cfg.type] = getLastValue(
        record,
        hideGPUByLicense(MetricTypes, cluster)[cfg.type],
        cfg.unit,
      );
    });
    return metrics;
  };

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      searchable: true,
      sortable: true,
      render: (value, row) => (
        <Field
          value={<Link to={value}>{getDisplayName(row)}</Link>}
          avatar={<Nodes size={40} />}
          label={<FieldLabel>{row.ip || '-'}</FieldLabel>}
        />
      ),
    },
    // 角色
    {
      title: t('ROLE'),
      field: 'role',
      canHide: true,
      render: roles => (roles.indexOf('master') === -1 ? t('WORKER') : t('CONTROL_PLANE')),
    },
    // 服务器状态
    {
      title: t('Server Status'),
      field: 'status',
      canHide: true,
      render: (value, row) => {
        const status = getNodeStatus(row);
        const taints = row.taints;
        return (
          <div>
            <StatusIndicator type={status}>
              {t(`NODE_STATUS_${status.toUpperCase()}`)}
            </StatusIndicator>
            {!isEmpty(taints) && row.importStatus === 'success' && (
              <Tooltip content={renderTaintsTip(taints)}>
                <Taints>{taints.length}</Taints>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    // 调度状态
    {
      title: t('Scheduling Status'),
      field: 'scheduling',
      render: () => <div>-</div>,
    },
    // 所属计算池
    {
      title: t('Associated Compute Pool'),
      field: 'pool',
      render: () => <div>-</div>,
    },
    // cpu用量
    {
      title: t('CPU_USAGE'),
      field: 'cpu',
      canHide: true,
      render: (value, row) => {
        const metrics = getRecordMetrics(row, [
          {
            type: 'cpu_used',
            unit: 'Core',
          },
          {
            type: 'cpu_total',
            unit: 'Core',
          },
          {
            type: 'cpu_utilisation',
          },
        ]);
        return (
          <Field
            value={
              <Resource>
                <span>{toPercentage(metrics.cpu_utilisation)}</span>
                {metrics.cpu_utilisation >= 0.9 && <Exclamation />}
              </Resource>
            }
            label={`${metrics.cpu_used}/${metrics.cpu_total} ${t('CORE_PL')}`}
          />
        );
      },
    },
    // 内存用量
    {
      title: t('MEMORY_USAGE'),
      field: 'memory',
      canHide: true,
      render: (value, row) => {
        const metrics = getRecordMetrics(row, [
          {
            type: 'memory_used',
            unit: 'Gi',
          },
          {
            type: 'memory_total',
            unit: 'Gi',
          },
          {
            type: 'memory_utilisation',
          },
        ]);
        return (
          <Field
            value={
              <Resource>
                <span>{toPercentage(metrics.memory_utilisation)}</span>
                {metrics.memory_utilisation >= 0.9 && <Exclamation />}
              </Resource>
            }
            label={`${metrics.memory_used}/${metrics.memory_total} GiB`}
          />
        );
      },
    },
    // gpu用量
    {
      title: t('GPU_USAGE'),
      field: 'gpu',
      canHide: true,
      render: (value, row) => {
        const metrics = getRecordMetrics(row, [
          {
            type: 'gpu_used',
            unit: 'Core',
          },
          {
            type: 'gpu_total',
            unit: 'Core',
          },
          {
            type: 'gpu_utilization',
          },
        ]);
        return (
          <Field
            value={
              <Resource>
                <span>{toPercentage(metrics.gpu_utilization)}</span>
                {metrics.gpu_utilization >= 0.9 && <Exclamation />}
              </Resource>
            }
            label={`${metrics.gpu_used}/${metrics.gpu_total} ${t('CORE_PL')}`}
          />
        );
      },
    },
    {
      title: t('GPU_MEMORY_USAGE'),
      field: 'gpu_memory',
      canHide: true,
      render: (value, row) => {
        const metrics = getRecordMetrics(row, [
          {
            type: 'gpu_memory_used',
            unit: 'Gi',
          },
          {
            type: 'gpu_memory_total',
            unit: 'Gi',
          },
          {
            type: 'gpu_memory_utilization',
          },
        ]);
        return (
          <Field
            value={
              <Resource>
                <span>{toPercentage(metrics.gpu_memory_utilization)}</span>
                {metrics.gpu_memory_utilization >= 0.9 && <Exclamation />}
              </Resource>
            }
            label={`${metrics.gpu_memory_used}/${metrics.gpu_memory_total} GiB`}
          />
        );
      },
    },
    // 物理磁盘使用率
    {
      title: t('Physical disk utilization'),
      field: 'disk',
      render: () => <div>-</div>,
    },
    {
      title: t('Management NIC'),
      field: 'nic',
      render: () => <div>-</div>,
    },
    {
      title: t('computational network'),
      field: 'network',
      render: () => <div>-</div>,
    },
    {
      title: t('Storage network'),
      field: 'storege',
      render: () => <div>-</div>,
    },
    {
      id: 'more',
      title: ' ',
      render: (value, row) => {
        return renderItemAction(value, row)
      },
    },
  ];
  
  return columns;
};

export default getColumns;
