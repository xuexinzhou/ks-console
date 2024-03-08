import React, { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Computing } from '@kubed/icons';

import { NavMenu, NavTitle, useGlobalStore, workspaceStore} from '@ks-console/shared';
import { navs as navMenus } from './contants';
import ClusterSelect from './clusterSelect';

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

  const params = useParams<'workspace' | 'cluster'>();
  const { workspace: workspaceName = '', cluster } = params;
  const { getNav, setNav } = useGlobalStore();

  let navs = getNav(navKey);

  const { workspaceDetail } = useFetchWorkspaceQuery({
    workspace: workspaceName,
    cluster,
    enabled: Boolean(workspaceName),
  });

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
        />
        <ClusterSelect />
        {navs && cluster && (
          <NavMenu navs={navs} prefix={`/ai-manage/${cluster}`} pathname={location.pathname} />
        )}
      </PageSide>
      <PageMain>{cluster && <Outlet />}</PageMain>
    </>
  );
}

export default ListLayout;
