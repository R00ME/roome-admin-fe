'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type {
  ServiceDashboardType,
  DashboardChartResponse,
} from '@/types/service-dashboard';

interface LineChartProps {
  type: ServiceDashboardType;
  data: DashboardChartResponse | null;
}

const chartConfig = {
  value: {
    label: '사용자 수',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function ServiceLineChart({ type, data }: LineChartProps) {
  // API 데이터를 차트 형식으로 변환
  const chartData =
    data?.map((item) => ({
      date: item.xlabels,
      value: parseInt(item.value),
    })) || [];

  const getTitle = (type: ServiceDashboardType) => {
    switch (type) {
      case 'DAU':
        return '일간 활성 사용자 (DAU)';
      case 'MAU':
        return '월간 활성 사용자 (MAU)';
      case 'INFLOW':
        return '신규 사용자';
      case 'CONTENT':
        return '콘텐츠 등록 수';
      default:
        return '사용자 지표';
    }
  };

  const getDescription = (type: ServiceDashboardType) => {
    switch (type) {
      case 'DAU':
        return '최근 7일간 일간 활성 사용자 추이';
      case 'MAU':
        return '최근 7일간 월간 활성 사용자 추이';
      case 'INFLOW':
        return '최근 7일간 신규 사용자 추이';
      case 'CONTENT':
        return '최근 7일간 콘텐츠 등록 수 추이';
      default:
        return '최근 7일간 사용자 지표 추이';
    }
  };

  if (!data || chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{getTitle(type)}</CardTitle>
          <CardDescription>{getDescription(type)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-center h-64 text-gray-500'>
            데이터가 없습니다.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTitle(type)}</CardTitle>
        <CardDescription>{getDescription(type)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
                return `${date.getMonth() + 1}/${date.getDate()}`;
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
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 leading-none font-medium'>
          최근 7일간 데이터 <TrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          {chartData.length}일간의 {getTitle(type)} 추이를 보여줍니다
        </div>
      </CardFooter>
    </Card>
  );
}
