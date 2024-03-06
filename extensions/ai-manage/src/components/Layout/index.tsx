import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Computing } from '@kubed/icons';
import { useModal, Select } from '@kubed/components';

import type { FormattedWorkspace } from '@ks-console/shared';
import { NavMenu, NavTitle, useGlobalStore, workspaceStore, Icon } from '@ks-console/shared';
import { navs as navMenus } from './contants';

const { useFetchWorkspaceQuery } = workspaceStore;

const PageSide = styled.div`
  position: fixed;
  top: 88px;
  padding: 0 20px 40px;
  width: 260px;
  z-index: 99;

  p {
    color: #79879c;
    font-size: 12px;
    padding-left: 14px;
  }
`;

const PageMain = styled.div`
  margin-left: 240px;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const navKey = 'MANAGE_AI_NAV';

function ListLayout(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  const params = useParams<'workspace' | 'cluster'>();
  const { workspace: workspaceName = '', cluster } = params;
  const { getNav, setNav } = useGlobalStore();

  let navs = getNav(navKey);
  const modal = useModal();

  const { workspaceDetail } = useFetchWorkspaceQuery({
    workspace: workspaceName,
    cluster,
    enabled: Boolean(workspaceName),
  });

  const handleSelect = (modalId: string, formattedWorkspace: FormattedWorkspace) => {
    navigate(`/workspaces/${formattedWorkspace.name}/overview`);
    modal.close(modalId);
  };

  useEffect(() => {
    if (!navs) {
      setNav(navKey, navMenus);
    }
  }, []);

  return (
    <>
      <PageSide>
        <NavTitle
          icon={<Computing variant="light" size={40} />}
          title={t('AI_MANAGE')}
          subtitle={workspaceDetail?.description || t('SUB_TITLE')}
          style={{ marginBottom: '20px' }}
          // onClick={openWorkspaceSelector}
        />
        <Select
          style={{ width: '100%', marginBottom: 12 }}
          prefixIcon={<Icon name="cluster" />}
          options={[
            { label: 1, value: 1 },
            { label: 1, value: 21 },
            { label: 1, value: 3 },
            { label: 1, value: 4 },
            { label: 1, value: 5 },
            { label: 1, value: 6 },
            { label: 1, value: 11 },
            { label: 1, value: 211 },
            { label: 1, value: 31},
            { label: 1, value: 41},
            { label: 1, value: 51 },
            { label: 1, value: 61 },
          ]}
          name="select"
          defaultValue="CentOS"
          pagination={{ page: 1, total: 100, limit: 6 }}
        />
        {navs && <NavMenu navs={navs} prefix="/ai-manage" pathname={location.pathname} />}
      </PageSide>
      <PageMain>
        <Outlet />
      </PageMain>
    </>
  );
}

export default ListLayout;
