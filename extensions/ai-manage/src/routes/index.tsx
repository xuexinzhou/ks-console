import React from 'react';

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import NodeManage from '../pages/NodeManage';

import nodeDetailRoutes from '../pages/NodeManage/Detail/router'

export default [
  {
    path: '/ai-manage',
    element: <Layout />,
    children: [
      { path: '', element: <Dashboard /> },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'nodes',
        element: <NodeManage />,
      },
    ],
  },
  ...nodeDetailRoutes
];
