import React from 'react';

function Dashboard() {
  return (
    <iframe
      id="my-dashboard"
      src="http://60.216.39.180:31919/d/Oxed_c6Wz/nvidia-dcgm-exporter-dashboard?orgId=1&var-instance=10.233.88.5%3A9400&var-instance=10.233.91.164%3A9400&var-gpu=All&theme=light&refresh=30s&kiosk=tv"
      width="100%"
      style={{ height: 'calc(100vh - 116px)', border: 0 }}
    ></iframe>
  );
}

export default Dashboard;
