import DAUIcon from '@/assets/icons/service-dashboard/DAU-icon.svg?react';
import MAUIcon from '@/assets/icons/service-dashboard/MAU-icon.svg?react';
import ContentsIcon from '@/assets/icons/service-dashboard/contents-icon.svg?react';
import NewUsersIcon from '@/assets/icons/service-dashboard/new-user-icon.svg?react';
import RevisionsIcon from '@/assets/icons/service-dashboard/revisiting-icon.svg?react';
import type { ServiceDashboardType } from '@/types/service-dashboard';

import { statTitleMap } from '@/constants/service-dashboard/stat-card';

interface StatCardProps {
  title: ServiceDashboardType;
  value: string | number;
  icon: ServiceDashboardType;
  trend: {
    value: number;
    isPositive: boolean;
  };
  unit?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const iconMap = {
  DAU: DAUIcon,
  MAU: MAUIcon,
  CONTENTS: ContentsIcon,
  NEW_USERS: NewUsersIcon,
  REFERRAL: RevisionsIcon, // 유입경로는 기존 revisiting 아이콘 사용
};

const StatCard = ({
  title,
  value,
  icon,
  trend,
  unit = '',
  isActive = false,
  onClick,
}: StatCardProps) => {
  const Icon = iconMap[icon];

  return (
    <button
      type='button'
      onClick={onClick}
      className={`w-full text-left transition-all cursor-pointer relative py-6 px-8 h-full
      ${
        isActive
          ? 'bg-white shadow-blue rounded-lg z-10 w-[calc(100%+3rem)]'
          : 'bg-gray-50 hover:bg-gray-100 w-full'
      }
      ${!isActive && title !== 'CONTENTS' ? 'border-r border-gray-200' : ''}`}>
      <div className='flex items-start gap-4'>
        <Icon className='h-14 w-14' />

        <div className='space-y-1'>
          <span className='text-sm text-gray-500'>{statTitleMap[title]}</span>
          <div className='text-3xl font-semibold text-gray-700'>
            {value}
            {unit}
          </div>
          <div
            className={`text-sm ${
              trend.isPositive ? 'text-green-500' : 'text-red-500'
            }`}>
            {trend.isPositive ? '+' : '-'}
            {Math.abs(trend.value)}% from last week
          </div>
        </div>
      </div>
    </button>
  );
};

export default StatCard;
