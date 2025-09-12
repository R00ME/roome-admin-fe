import { useState } from 'react';
import { Card } from '@/components/ui/card';
import type { DashboardAISummaryResponse } from '@/types/service-dashboard';
import {
  ChartPieIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

import SparklesIcon from '@/assets/icons/service-dashboard/sparkle-icon.svg?react';
import SmartReportModal from './SmartReportModal';

interface ServiceReportProps {
  data: DashboardAISummaryResponse | null;
}

const ServiceReport = ({ data }: ServiceReportProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 현재 날짜에서 월 추출
  const currentMonth = new Date().getMonth() + 1; // getMonth()는 0부터 시작하므로 +1

  return (
    <>
      <Card className='h-full p-6 flex flex-col shadow-none rounded-lg'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-medium text-[#4983EF] flex items-center gap-2'>
            한달 리포트 요약
            <SparklesIcon className='w-4 h-4 opacity-50 ' />
          </h2>
        </div>

        <div className='w-full bg-blue-50 rounded-full p-4 text-center text-gray-600 font-medium'>
          <span className='text-xl font-medium'>{currentMonth}월</span>
        </div>

        <div className='flex-1 flex flex-col space-y-3 text-gray-600 py-1'>
          {data ? (
            <>
              <div className='flex items-start gap-3'>
                <ChartPieIcon className='w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0' />
                <p className='text-sm leading-relaxed'>
                  {data.mostUsedFeature}
                </p>
              </div>
              <div className='flex items-start gap-3'>
                <ExclamationTriangleIcon className='w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0' />
                <p className='text-sm leading-relaxed'>
                  {data.mostDroppedFeature}
                </p>
              </div>
              <div className='flex items-start gap-3'>
                <ChartBarIcon className='w-5 h-5 text-green-500 mt-0.5 flex-shrink-0' />
                <p className='text-sm leading-relaxed'>{data.mostEntryPath}</p>
              </div>
            </>
          ) : (
            <p className='text-gray-400 text-sm'>데이터가 없습니다.</p>
          )}
        </div>
      </Card>

      <SmartReportModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};

export default ServiceReport;
