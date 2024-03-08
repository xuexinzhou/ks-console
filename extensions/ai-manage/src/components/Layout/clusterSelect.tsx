import React, { useState, useEffect } from 'react';
import { Select } from '@kubed/components';
import { Icon } from '@ks-console/shared';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@kubed/stook';

import { BaseStore } from '../../stores';

const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 6px;

  span {
    margin-left: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

function ClusterSelect(): JSX.Element {
  const Option = Select.Option;
  const navigate = useNavigate();
  const { cluster } = useParams();

  const [value, setValue] = useState(cluster ?? '');

  const { useFetchClusterList } = BaseStore;

  const { data = [] } = useFetchClusterList({
    params: {
      limit: -1,
      labelSelector: 'cluster-role.kubesphere.io/host=',
    },
  });

  const handleSelect = (_value: string) => {
    setValue(_value);
    navigate(`/ai-manage/${value}/nodes`);
  };

  const [, setDetailProps] = useStore('cluster', {});

  useEffect(() => {
    if (data?.length && !cluster) {
      const defaultValue = (data?.[0] as any)?.value;
      setValue(defaultValue);
      setDetailProps(data?.[0]);
      navigate(`/ai-manage/${defaultValue}/dashboard`);
    }
  }, [data, cluster]);

  return (
    <Select
      style={{ width: '100%', marginBottom: 12 }}
      onChange={handleSelect}
      value={value}
      defaultValue={cluster}
    >
      {(data || [])?.map((item: any) => (
        <Option value={item!.value} key={item!.value}>
          <ItemIcon>
            <Icon name="cluster" size={16} />
            <span>{item!.label}</span>
          </ItemIcon>
        </Option>
      ))}
    </Select>
  );
}

export default ClusterSelect;
