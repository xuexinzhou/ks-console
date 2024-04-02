import React, { useRef } from 'react';

function Dashboard() {
  const iframeRef: any = useRef(null);

  const url =
    'http://60.216.39.180:31919/d/Oxed_c6Wz/nvidia-dcgm-exporter-dashboard?orgId=1&var-instance=10.233.88.5%3A9400&var-instance=10.233.91.164%3A9400&var-gpu=All&theme=light&refresh=10s&kiosk=tv';

  const onIframeLoad = () => {
    if (iframeRef.current) {
      try {
        const iframeDom =
          iframeRef.current?.contentWindow?.document || iframeRef?.current?.contentDocument;
        if (iframeDom) {
          if (iframeDom.querySelector('#reactRoot .sidemenu')) {
            iframeDom.querySelector('#reactRoot .sidemenu').style.display = 'none';
          }
        }
      } catch (error) {}
    }
  };

  return (
    <>
      <iframe
        id="my-dashboard"
        ref={iframeRef}
        src={url}
        width="100%"
        style={{ height: 'calc(100vh - 116px)', border: 0 }}
        onLoad={onIframeLoad}
      ></iframe>
    </>
  );
}

export default Dashboard;
