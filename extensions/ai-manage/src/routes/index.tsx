import React from 'react';

import Layout from '../components/Layout';
import Overview from '../pages/Overview';
import Dashboard from '../pages/Dashboard';
import NodeManage from '../pages/NodeManage';
import XidRecord from '../pages/Xid';

import nodeDetailRoutes from '../pages/NodeManage/Detail/router'

export default [
  {
    path: '/ai-manage',
    element: <Layout />,
    children: [
      { path: '', element: <Layout /> },
      {
        path: ':cluster/overview',
        element: <Overview />,
      },
      {
        path: ':cluster/dashboard',
        element: <Dashboard />,
      },
      {
        path: ':cluster/xid',
        element: <XidRecord />,
      },
      {
        path: ':cluster/nodes',
        element: <NodeManage />,
      },
    ],
  },
  ...nodeDetailRoutes
];
