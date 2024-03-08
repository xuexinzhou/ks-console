import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { isEmpty } from 'lodash';
import { Nodes,Start,Stop,Terminal,Trash } from '@kubed/icons';
import { Banner, Navs } from '@kubed/components';
import {
  DataTable,
  TableRef,
  nodeStore,
  hasClusterModule,
  monitorStore,
  hideGPUByLicense,
  useItemActions,
  useCommonActions,
  KubectlModal
} from '@ks-console/shared';

import NodeStatus from './nodeStatus';
import { getColumns } from './columns';

import {
  MetricTypes,
  transformRequestParams,
  authKey,
  getUnschedulable,
  getReady,
} from './contants';

const {
  getResourceUrl,
  mapper: nodeMapper,
  fetchCount,
  nodeCordon,
  nodeUncordon,
  useBatchPatchTaints,
  fetchList,
} = nodeStore;

const { useMonitorStore, apiVersion } = monitorStore;

function NodeManage() {
  const tableRef = useRef<TableRef>();
  const [tab, seTtab] = useState('monitor');
  const [kubeCtlVisible, setKubeCtlVisible] = useState<boolean>(false);
  const [kubeCtlParams, setKubeCtlParams] = useState<Record<string, any>>({});
  const params: Record<string, any> = useParams();
  const url = getResourceUrl(params);

  const getApi = () => `${apiVersion({})}/node_metrics`;
  const { fetchMetrics } = useMonitorStore({ getApiFn: getApi });

  const cluster = 'host';

  const callback = () => {
    tableRef?.current?.refetch();
  };


  const { del } = useCommonActions({
    store: nodeStore,
    params: { cluster },
    callback,
  });

  const renderItemAction = useItemActions({
    authKey,
    params: { cluster },
    actions: [
      {
        key: 'uncordon',
        icon: <Start />,
        text: t('UNCORDON'),
        action: 'edit',
        show: record => record.importStatus === 'success' && getUnschedulable(record),
        onClick: (e, record) => {
          nodeUncordon(record).then(() => callback());
        },
      },
      {
        key: 'cordon',
        icon: <Stop />,
        text: t('CORDON'),
        action: 'edit',
        show: record => record.importStatus === 'success' && !getUnschedulable(record),
        onClick: (e, record) => {
          nodeCordon(record).then(() => callback());
        },
      },
      {
        key: 'terminal',
        icon: <Terminal />,
        text: t('OPEN_TERMINAL'),
        action: 'edit',
        show: record => record.importStatus === 'success' && getReady(record),
        onClick: (e, record) => {
          setKubeCtlParams({ cluster, nodename: record.name, isEdgeNode: true });
          setKubeCtlVisible(true);
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        show: item => item.importStatus === 'failed',
        onClick: (e, record: any) => {
          del({ ...record, type: 'CLUSTER_NODE' });
        },
      },
    ],
  });

  const { data: { data: tableList = [], total: totalCount } = {} } = useQuery(
    [`cluster-${cluster}-nodes`],
    () => {
      const queryParams = transformRequestParams({ cluster, filters: [], pageIndex: -1 });
      return fetchList(queryParams);
    },
  );

  const { data: monitorData } = useQuery(
    ['monitor', tableList],
    () => {
      // 临时取反，为了获取到数据，记得改回来
      if (hasClusterModule(cluster, 'whizard-monitoring') && !isEmpty(tableList)) {
        return fetchMetrics({
          cluster,
          resources: tableList.map((node: any) => node.name),
          metrics: Object.values(hideGPUByLicense(MetricTypes, cluster)),
          last: true,
        });
      } else {
        return {
          data: undefined,
          isLoading: false,
        };
      }
    },
    {
      staleTime: 60 * 1000,
    },
  );

  const columns = getColumns({ cluster, monitorData, renderItemAction } as any);

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

  return (
    <div>
      <Banner
        className="mb12"
        icon={<Nodes />}
        title={t('Node Manage')}
        description={t('Node Desc')}
      />
      <NodeStatus />
      <DataTable
        ref={tableRef}
        tableName="nodes"
        rowKey="name"
        format={(item: any) => ({ ...nodeMapper(item) })}
        url={url}
        toolbarLeft={<Navs className="mr12" data={navs} value={tab} onChange={v => seTtab(v)} />}
        columns={columns}
      />
      {/* {taintVisible && (
        <TaintBatchModal
          visible={taintVisible}
          nodes={selectedNodes}
          onOk={mutateNodesTaint}
          confirmLoading={isNodesTaintLoading}
          onCancel={() => setTaintVisible(false)}
        />
      )} */}
      {/* {addVisible && (
        <AddNodeModal
          visible={addVisible}
          onOk={mutateKKUpdate}
          confirmLoading={isKKUpdateLoading}
          addAfterCreate={true}
          onCancel={() => setAddVisible(false)}
        />
      )} */}
      {kubeCtlVisible && (
        <KubectlModal
          visible={kubeCtlVisible}
          title={kubeCtlParams.nodename}
          params={kubeCtlParams}
          onCancel={() => setKubeCtlVisible(false)}
        />
      )}
    </div>
  );
}

export default NodeManage;
