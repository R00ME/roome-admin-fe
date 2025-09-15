import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  chartTitles,
  chartDescriptions,
} from '@/constants/service-dashboard/chart-info';
import ChartEmptyState from './ChartEmptyState';
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
  // 데이터가 없거나 빈 배열인 경우
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{chartTitles[selectedCard]}</CardTitle>
          <CardDescription>{chartDescriptions[selectedCard]}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartEmptyState message='데이터 집계중인 항목입니다.' />
        </CardContent>
      </Card>
    );
  }

  // 모든 항목의 value가 null인 경우에만 빈 상태로 처리
  const allValuesNull = data.every((item) => item.value === null);
  if (allValuesNull) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{chartTitles[selectedCard]}</CardTitle>
          <CardDescription>{chartDescriptions[selectedCard]}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartEmptyState
            message='분석된 결과가 없습니다.'
            showDots={false}
          />
        </CardContent>
      </Card>
    );
  }

  // REFERRAL은 파이차트, 나머지는 라인차트
  if (selectedCard === 'REFERRAL') {
    return (
      <Card className='flex flex-col'>
        <CardHeader className='items-center pb-0'>
          <CardTitle>{chartTitles[selectedCard]}</CardTitle>
          <CardDescription>{chartDescriptions[selectedCard]}</CardDescription>
        </CardHeader>
        <CardContent className='flex-1 pb-0'>
          <ServicePieChart data={data} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartTitles[selectedCard]}</CardTitle>
        <CardDescription>{chartDescriptions[selectedCard]}</CardDescription>
      </CardHeader>
      <CardContent>
        <ServiceLineChart
          data={data}
          chartType={selectedCard}
        />
      </CardContent>
    </Card>
  );
};

export default ServiceChart;
