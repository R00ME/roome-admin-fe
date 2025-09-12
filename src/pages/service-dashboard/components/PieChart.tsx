'use client';

import { TrendingUp } from 'lucide-react';
import { LabelList, Pie, PieChart } from 'recharts';
import { ReactNode } from 'react';

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
import ChartEmptyState from './ChartEmptyState';
import type {
  ServiceDashboardType,
  DashboardChartResponse,
} from '@/types/service-dashboard';

interface PieChartProps {
  type: ServiceDashboardType;
  data: DashboardChartResponse | null;
}

const chartConfig = {
  value: {
    label: '사용자 수',
  },
  naver: {
    label: '네이버',
    color: 'var(--chart-1)',
  },
  google: {
    label: '구글',
    color: 'var(--chart-2)',
  },
  direct: {
    label: '직접 접속',
    color: 'var(--chart-3)',
  },
  other: {
    label: '기타',
    color: 'var(--chart-4)',
  },
} satisfies ChartConfig;

export function ServicePieChart({ data }: PieChartProps) {
  // API 데이터를 차트 형식으로 변환
  const chartData =
    data?.map((item, index) => {
      const value = item.value ? parseInt(item.value) : 0;
      const source = item.xlabels || `소스 ${index + 1}`;

      // 소스명을 간단하게 변환
      let label = source;
      if (source.includes('naver.com')) {
        label = 'naver';
      } else if (source.includes('google.com')) {
        label = 'google';
      } else if (source.includes('direct') || source === '직접') {
        label = 'direct';
      } else {
        label = 'other';
      }

      return {
        source: label,
        value: value,
        fill: `var(--color-${label})`,
      };
    }) || [];

  // 데이터가 없거나 빈 배열인 경우
  if (!data || chartData.length === 0) {
    return (
      <Card className='flex flex-col'>
        <CardHeader className='items-center pb-0'>
          <CardTitle>유입 경로 분석</CardTitle>
          <CardDescription>최근 7일간 유입 경로별 사용자 분포</CardDescription>
        </CardHeader>
        <CardContent className='flex-1 pb-0'>
          <ChartEmptyState message='데이터 집계중인 항목입니다.' />
        </CardContent>
      </Card>
    );
  }

  // value가 null인 경우 (분석된 결과가 없는 경우)
  const hasNullValues = data.some((item) => item.value === null);
  if (hasNullValues) {
    return (
      <Card className='flex flex-col'>
        <CardHeader className='items-center pb-0'>
          <CardTitle>유입 경로 분석</CardTitle>
          <CardDescription>최근 7일간 유입 경로별 사용자 분포</CardDescription>
        </CardHeader>
        <CardContent className='flex-1 pb-0'>
          <ChartEmptyState
            message='분석된 결과가 없습니다.'
            showDots={false}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>유입 경로 분석</CardTitle>
        <CardDescription>최근 7일간 유입 경로별 사용자 분포</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]'>
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey='value'
                  hideLabel
                />
              }
            />
            <Pie
              data={chartData}
              dataKey='value'>
              <LabelList
                dataKey='source'
                className='fill-background'
                stroke='none'
                fontSize={12}
                formatter={(value: ReactNode) =>
                  chartConfig[value as keyof typeof chartConfig]?.label || value
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 leading-none font-medium'>
          유입 경로 분석 <TrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          {chartData.length}개 경로의 사용자 유입 분포를 보여줍니다
        </div>
      </CardFooter>
    </Card>
  );
}
