import { ServiceLineChart } from './LineChart';
import { ServicePieChart } from './PieChart';
import type {
  ServiceDashboardType,
  DashboardChartResponse,
} from '@/types/service-dashboard';

interface ServiceChartProps {
  selectedCard: ServiceDashboardType;
  data: DashboardChartResponse | null;
}

const ServiceChart = ({ selectedCard, data }: ServiceChartProps) => {
  // REFERRAL은 파이차트, 나머지는 라인차트
  if (selectedCard === 'REFERRAL') {
    return (
      <ServicePieChart
        type={selectedCard}
        data={data}
      />
    );
  }

  return (
    <ServiceLineChart
      type={selectedCard}
      data={data}
    />
  );
};

export default ServiceChart;
