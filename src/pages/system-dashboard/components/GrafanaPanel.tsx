type GrafanaPanelProps = {
  baseUrl?: string;
  dashboardUid: string;
  orgId?: number;
  panelId: number;
  nodeName: string;
  nodeAddress: string;
  prometheusDS?: string;
  job?: string;
  from?: string | number;
  to?: string | number;
  refresh?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
};

export default function GrafanaPanel({
  baseUrl = 'http://localhost:3000',
  dashboardUid,
  orgId = 1,
  panelId,
  nodeName,
  nodeAddress,
  prometheusDS = 'aeyb8m0uep2psa',
  job = 'frontoffice-node-exporter',
  from = 'now-1h',
  to = 'now',
  refresh = '1m',
  width = '100%',
  height = 200,
  className,
  title,
}: GrafanaPanelProps) {
  const params = new URLSearchParams({
    orgId: String(orgId),
    from: String(from),
    to: String(to),
    timezone: 'browser',
    'var-DS_PROMETHEUS': prometheusDS,
    'var-job': job,
    'var-nodename': nodeName,
    'var-node': nodeAddress,
    'var-diskdevices': '[a-z]+|nvme[0-9]+n[0-9]+|mmcblk[0-9]+',
    refresh,
    panelId: String(panelId),
    '__feature.dashboardSceneSolo': 'true',
  });

  const src = `${baseUrl}/d-solo/${dashboardUid}?${params.toString()}`;

  return (
    <iframe
      src={src}
      title={title ?? `grafana-panel-${panelId}`}
      width={typeof width === 'number' ? `${width}px` : width}
      height={typeof height === 'number' ? `${height}px` : height}
      frameBorder={0}
      className={className}
    />
  );
}
