import { useEffect, useState } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { fetchUserActiveTime } from '../../../../apis/userdashboard';
import { useSelectUserStore } from '../../../../store/useSelectUserStore';
import { UserActivityTime } from '../../../../types/user-dashboard';
import { COLORS, timeRangeEmojiMap } from '../../constants/useDashBoard-Detail';

export default function SummaryTab() {
  const [data, setData] = useState<UserActivityTime[]>([]);
  const { selectedUser } = useSelectUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchUserActiveTime(selectedUser!.userId);
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='relative w-full h-64 pb-8 flex items-center justify-center'>
      
      <ResponsiveContainer
        width='100%'
        height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey='ratio'
            nameKey='timeRange'
            cx='50%'
            cy='50%'
            outerRadius={100}
            label={({ payload, percent }) =>
              `${timeRangeEmojiMap[payload.timeRange] ?? ''} ${(
                percent * 100
              ).toFixed(1)}%`
            }>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                strokeWidth='2'
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className='bg-white shadow-md rounded px-2 py-1 text-xs text-gray-700'>
                    <p>
                      {`${timeRangeEmojiMap[item.timeRange] ?? ''} ${
                        item.timeRange
                      } : ${~~item.ratio}% (${item.count}건)`}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            content={(props) => {
              const { payload } = props;
              return (
                <ul className='flex flex-wrap justify-center'>
                  {payload?.map((entry, index) => (
                    <li
                      key={`item-${index}`}
                      className='text-xs text-gray-600 mx-2 flex items-center'>
                      <span
                        className='inline-block w-2 h-2 mr-1'
                        style={{ backgroundColor: entry.color }}
                      />
                      {entry.value}
                    </li>
                  ))}
                </ul>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
