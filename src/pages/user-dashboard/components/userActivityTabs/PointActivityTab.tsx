import { useEffect, useState } from 'react';
import { fetchPointIssue } from '../../../../apis/userdashboard';
import { useSelectUserStore } from '../../../../store/useSelectUserStore';
import { TrendPoint } from '../../../../types/user-dashboard';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function PointActivityTab() {
  const [data, setData] = useState<TrendPoint[]>([]);
  const { selectedUser } = useSelectUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchPointIssue(selectedUser!.userId);
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-80 pb-10">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 0, right: 30, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#444" }}
          />
          <YAxis tick={{ fontSize: 12, fill: "#444" }} />
          <Tooltip formatter={(value) => `${value}P`} contentStyle={{ fontSize: "12px" }} />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Line
            type="monotone"
            dataKey="earnedPoints"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="획득 포인트"
          />
          <Line
            type="monotone"
            dataKey="usedPoints"
            stroke="#b7334f"
            strokeWidth={2}
            dot={false}
            name="사용 포인트"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
