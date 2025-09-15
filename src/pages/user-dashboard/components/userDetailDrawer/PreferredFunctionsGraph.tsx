import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { PreferredFunctionsGraphProps } from '../../../../types/user-dashboard';

export default function PreferredFunctionsGraph({
  data,
}: PreferredFunctionsGraphProps) {
  const top5 = [...data]
    .sort((a, b) => b.apiRequestCount - a.apiRequestCount)
    .slice(0, 5);

  const chartData = top5.map((item) => ({
    feature: item.feature,
    value: item.apiRequestCount,
  }));

  return (
    <ResponsiveContainer>
      <RadarChart data={chartData}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey='feature'
          tick={{ fontSize: 12, fill: '#1e316d' }}
        />
        <Radar
          name='사용량'
          dataKey='value'
          stroke='#3b82f6'
          fill='#3b82f6'
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
