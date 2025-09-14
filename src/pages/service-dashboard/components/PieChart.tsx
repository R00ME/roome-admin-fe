import { TrendingUp } from 'lucide-react';
import { LabelList, Pie, PieChart } from 'recharts';
import { ReactNode } from 'react';

import { CardFooter } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { DashboardChartResponse } from '@/types/service-dashboard';

interface PieChartProps {
  data: DashboardChartResponse;
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
  const chartData = data.map((item, index) => {
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
  });

  return (
    <>
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
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 leading-none font-medium'>
          유입 경로 분석 <TrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          {chartData.length}개 경로의 사용자 유입 분포를 보여줍니다
        </div>
      </CardFooter>
    </>
  );
}
