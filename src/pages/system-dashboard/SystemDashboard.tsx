import DashboardTitle from '@/components/DashboardTitle';
import GrafanaGrid from './components/GrafanaGrid';
import { useEffect, useState } from 'react';

const GRAFANA_COMMON = {
  baseUrl: 'http://13.209.66.59:3000',
  dashboardUid: 'rYdddlPWk',
  orgId: 1,
  prometheusDS: 'aeyb8m0uep2psa',
  job: 'frontoffice-node-exporter',
  nodeName: 'ip-172-31-7-236',
  nodeAddress: '43.200.133.70:9100',
  refresh: '1m',
  height: 200,
} as const;

const GRAFANA_ITEMS = [
  {
    key: 'cpu-77',
    panelId: 77,
    from: 1758193618626,
    to: 1758195418626,
    gridColumn: 'span 6',
    title: 'CPU Usage',
  },
  {
    key: 'mem-78',
    panelId: 78,
    from: 1758193965505,
    to: 1758195765505,
    gridColumn: 'span 6',
    title: 'Memory Usage',
  },
  {
    key: 'load-74',
    panelId: 74,
    from: 1758193965505,
    to: 1758195765505,
    gridColumn: 'span 6',
    title: 'Load Average',
  },
  {
    key: 'net-152',
    panelId: 152,
    from: 1758194025649,
    to: 1758195825649,
    gridColumn: 'span 6',
    title: 'Network',
  },
  {
    key: 'proc-63',
    panelId: 63,
    from: 1758194523243,
    to: 1758196323243,
    gridColumn: 'span 6',
    title: 'Processes',
  },
  {
    key: 'fs-124',
    panelId: 124,
    from: 1758194523243,
    to: 1758196323243,
    gridColumn: 'span 6',
    title: 'Filesystem 1',
  },
  {
    key: 'fs-126',
    panelId: 126,
    from: 1758194523243,
    to: 1758196323243,
    gridColumn: 'span 6',
    title: 'Filesystem 2',
  },
  {
    key: 'tcp-336',
    panelId: 336,
    from: 1758194583272,
    to: 1758196383272,
    gridColumn: 'span 6',
    title: 'TCP',
  },
  {
    key: 'irq-220',
    panelId: 220,
    from: 1758194583272,
    to: 1758196383272,
    gridColumn: 'span 6',
    title: 'Interrupts',
  },
] as const;

const SystemDashboard = () => {
  const [order, setOrder] = useState<string[]>(() => {
    const saved = localStorage.getItem('system-dashboard-order');
    return saved
      ? (JSON.parse(saved) as string[])
      : GRAFANA_ITEMS.map((it) => it.key);
  });

  useEffect(() => {
    localStorage.setItem('system-dashboard-order', JSON.stringify(order));
  }, [order]);
  return (
    <>
      <section>
        <DashboardTitle
          title='운영 시스템'
          tooltipContent='시스템의 배포 상태(CPU, 메모리, 디스크 사용량)을 확인할 수 있습니다.'
        />
      </section>
      <GrafanaGrid
        items={GRAFANA_ITEMS.map((it) => ({ ...GRAFANA_COMMON, ...it }))}
        columns='repeat(12, minmax(0, 1fr))'
        gap={12}
        reorderable
        order={order}
        onOrderChange={setOrder}
      />
    </>
  );
};

export default SystemDashboard;
