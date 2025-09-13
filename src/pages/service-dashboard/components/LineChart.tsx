import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type {
  DashboardChartResponse,
  ServiceDashboardType,
} from '@/types/service-dashboard';

interface LineChartProps {
  data: DashboardChartResponse;
  chartType?: ServiceDashboardType;
}

const chartConfig = {
  value: {
    label: '사용자 수',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function ServiceLineChart({ data, chartType }: LineChartProps) {
  // API 데이터를 차트 형식으로 변환
  const chartData = data.map((item) => ({
    date: item.xlabels,
    value: item.value ? parseInt(item.value) : 0,
  }));

  return (
    <ChartContainer
      config={chartConfig}
      className='max-h-[400px] mx-auto'>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
          left: 12,
          right: 12,
        }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='date'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            const date = new Date(value);
            // MAU와 CONTENT는 월 단위, DAU와 INFLOW는 일 단위
            if (chartType === 'MAU' || chartType === 'CONTENT') {
              return `${date.getMonth() + 1}월`;
            } else {
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator='line' />}
        />
        <Line
          dataKey='value'
          type='natural'
          stroke='var(--color-value)'
          strokeWidth={2}
          dot={{
            fill: 'var(--color-value)',
          }}
          activeDot={{
            r: 6,
          }}>
          <LabelList
            position='top'
            offset={12}
            className='fill-foreground'
            fontSize={12}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  );
}
