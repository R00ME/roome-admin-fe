import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import SparklesIcon from '@/assets/icons/service-dashboard/sparkle-icon.svg?react';

const ServiceReport = () => {
  return (
    <Card className='h-full p-4 flex flex-col shadow-none rounded-lg'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-medium text-[#4983EF] flex items-center gap-2'>
          한달 리포트 요약
          <SparklesIcon className='w-4 h-4 opacity-50 ' />
        </h2>
        <Select defaultValue='month'>
          <SelectTrigger className='w-[100px] bg-white shadow-none'>
            <SelectValue placeholder='한달' />
          </SelectTrigger>
          <SelectContent className='w-[100px] min-w-[100px]'>
            <SelectItem value='month'>한달</SelectItem>
            <SelectItem value='week'>일주일</SelectItem>
            <SelectItem value='day'>하루</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='w-full bg-blue-50 rounded-full py-2 px-4 text-center text-gray-600 font-medium'>
        <Select defaultValue='04'>
          <SelectTrigger className='w-full bg-transparent border-none text-center text-lg font-medium shadow-none cursor-default'>
            <SelectValue placeholder='월 선택' />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <SelectItem
                key={month}
                value={month.toString().padStart(2, '0')}>
                {month}월
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex-1 flex flex-col justify-center space-y-1 text-gray-600 py-1'>
        <p>1. 가장 많이 사용한 기능은 000 입니다.</p>
        <p>2. 가장 이탈률이 많은 기능은 000 입니다.</p>
        <p>3. 0000 경로에서 가장 많은 사용자가 유입되었습니다.</p>
      </div>

      <button className='w-full py-3 text-gray-500 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer'>
        더보기
      </button>
    </Card>
  );
};

export default ServiceReport;
