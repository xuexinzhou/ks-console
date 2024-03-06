export const navs = [
  {
    name: 'dashboard',
    title: '',
    children: [
      { name: 'dashboard', title: 'Dashboard', icon: 'dashboard' },
      // {
      //   name: 'monitor-dashboard',
      //   title: 'Monitor Dashboard',
      //   icon: 'monitor'
      // },
      // {
      //   name: 'alarm-dashboard',
      //   title: 'Alarm Dashboard',
      //   icon: 'loudspeaker',
      //   disabled: true,
      //   showInDisable: true
      // },
    ],
  },
  {
    name: 'cluster manage',
    title: '集群管理',
    children: [{ name: 'nodes', title: 'Node Manage', icon: 'nodes' ,}]
  }

];
