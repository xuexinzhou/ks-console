import React, { useState } from 'react';
import type { UIEvent } from 'react';
import { debounce } from 'lodash';
import { FormItem, Select } from '@kubed/components';

import { userStore } from '@ks-console/shared';

const { useInfiniteUserList } = userStore;

interface WorkspaceManagerFieldProps {
  manager: string;
}

function WorkspaceManagerField({ manager }: WorkspaceManagerFieldProps) {
  const [requestParams, setRequestParams] = useState({
    name: '',
    annotation: 'kubesphere.io/creator',
  });

  const { data = [], fetchNextPage: nextPage, hasNextPage } = useInfiniteUserList(requestParams);

  const onSearch = debounce((val: string) => {
    setRequestParams({
      ...requestParams,
      name: val,
    });
  }, 500);
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    if (!hasNextPage) {
      return;
    }
    //@ts-ignore
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight - scrollHeight >= 0) {
      nextPage();
    }
  };
  const options = data.map(({ username }) => {
    return {
      label: username,
      value: username,
    };
  });
  if (options.every(user => user.value !== manager)) {
    options.unshift({
      value: manager,
      label: manager,
    });
  }

  return (
    <FormItem
      label={t('ADMINISTRATOR')}
      initialValue={globals.user.username}
      name={['spec', 'template', 'spec', 'manager']}
    >
      <Select
        showSearch
        options={options}
        onPopupScroll={debounce(onScroll, 500)}
        onSearch={onSearch}
      />
    </FormItem>
  );
}

export { WorkspaceManagerField };
