import { useEffect, useState } from "react";
import { fetchContentPublish } from "../../../../apis/userdashboard";
import { useSelectUserStore } from "../../../../store/useSelectUserStore";
import { domainMap } from "../../constants/useDashBoard-Detail";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DomainChartData, DomainCount } from "../../../../types/user-dashboard";

export default function ContentActivityTab() {
  const [data, setData] = useState<DomainChartData[]>([])
  const { selectedUser } = useSelectUserStore();
  useEffect(() => {
    const fetchData = async() => {
      try{
        if (!selectedUser) return; 

        const res = await fetchContentPublish(selectedUser!.userId)

        if (!res?.recent30Days || !res?.recent90Days) return;

        setData(
          res.recent30Days.domainCounts.map((item: DomainCount) => {
            const avgItem = res.recent90Days.domainCounts.find(
              (d: DomainCount) => d.domain === item.domain
            );
            return {
              domain: domainMap[item.domain] || item.domain, 
              이번달: item.count,
              평균: avgItem ? avgItem.count : 0,
            };
          })
        );
      }catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [])

  return (
    <div className="w-full h-80 pb-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 30, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="domain" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => `${value}회`} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="이번달" fill="#3b82f6" barSize={30} radius={[4, 4, 0, 0]} />
          <Bar dataKey="평균" fill="#93c5fd" barSize={30} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}