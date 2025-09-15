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
  null: {
    label: 'null',
    color: '#9ecbff',
  },
  notset: {
    label: '측정 불가',
    color: '#7ab8ff',
  },
  naver: {
    label: '네이버',
    color: '#90caf9',
  },
  google: {
    label: '구글',
    color: '#64b5f6',
  },
  direct: {
    label: '직접 접속',
    color: '#42a5f5',
  },
  other: {
    label: '기타',
    color: '#1e88e5',
  },
} satisfies ChartConfig;

export function ServicePieChart({ data }: PieChartProps) {
  // API 데이터를 차트 형식으로 변환
  const chartData = data.map((item) => {
    const value = item.value ? parseInt(item.value) : 0;
    const sourceRaw = item.xlabels;

    // 소스 key 매핑: null, not set, naver, google, direct, other
    let key: string;
    if (sourceRaw == null) {
      key = 'null';
    } else {
      const src = String(sourceRaw).toLowerCase();
      if (src.includes('not set')) {
        key = 'notset';
      } else if (src.includes('naver.com')) {
        key = 'naver';
      } else if (src.includes('google.com')) {
        key = 'google';
      } else if (src.includes('direct') || sourceRaw === '직접') {
        key = 'direct';
      } else {
        key = 'other';
      }
    }

    return {
      source: key,
      value,
      fill: `var(--color-${key})`,
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
