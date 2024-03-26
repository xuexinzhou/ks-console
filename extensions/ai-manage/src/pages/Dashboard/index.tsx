import React from 'react';

function Dashboard() {
  return (
    <iframe
      id="my-dashboard"
      src="http://60.216.39.180:31919/d/Oxed_c6Wz/nvidia-dcgm-exporter-dashboard?orgId=1&from=1711418471136&to=1711419371136&theme=light&kiosk=tv"
      width="100%"
      style={{ height: 'calc(100vh - 116px)', border: 0 }}
    ></iframe>
  );
}

export default Dashboard;
