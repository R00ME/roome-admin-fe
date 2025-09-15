import { useEffect, useState } from 'react';
import { fetchUserFeature } from '../../../../apis/userdashboard.ts';
import { useSelectUserStore } from '../../../../store/useSelectUserStore.ts';
import { FeatureStat } from '../../../../types/user-dashboard';
import { preferredFunctionHeaders } from '../../constants/preferredFunctions.ts.ts';
import PreferredFunctionsGraph from './PreferredFunctionsGraph.tsx';
import PreferredFunctionTable from './PreferredFunctionTable.tsx';

export default function PreferredFunctions({
  drawerWidth,
}: {
  drawerWidth: number;
}) {
  const [data, setData] = useState<FeatureStat[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedUser } = useSelectUserStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchUserFeature(selectedUser!.userId);
        setData(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedUser]);

  console.log(data);

  if (loading) return;

  return (
    <section className='w-full bg-[#f8f8f8c5] rounded-xl px-14 py-8 '>
      <h2 className='font-semibold text-[#293F66] mb-2'>선호하는 기능</h2>

      <div className='flex gap-18 justify-center items-stretch'>
        {drawerWidth > 900 && (
          <section className='flex-1 h-50 pt-8'>
            <PreferredFunctionsGraph data={data} />
          </section>
        )}
        <section className='flex-shrink-0-1'>
          <PreferredFunctionTable
            rows={data.slice(0, 5).map((item) => ({
              feature: item.feature,
              apiRequestCount: item.apiRequestCount,
              usageTime: item.usageTime,
              lastUsedAt: item.lastUsedAt,
              contentCount: item.contentCount,
            }))}
            getRowKey={(row) => row.feature}
            headers={preferredFunctionHeaders}
            fullWidth={drawerWidth > 900 ? false : true}
          />
        </section>
      </div>
    </section>
  );
}
