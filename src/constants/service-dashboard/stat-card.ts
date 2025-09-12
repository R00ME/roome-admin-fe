import type { ServiceDashboardType } from '@/types/service-dashboard';

interface StatCardData {
  title: ServiceDashboardType;
  value: number;
  icon: ServiceDashboardType;
  trend: {
    value: number;
    isPositive: boolean;
  };
}

export const statCards: StatCardData[] = [
  {
    title: 'DAU',
    value: 1000,
    icon: 'DAU',
    trend: { value: 10, isPositive: true },
  },
  {
    title: 'MAU',
    value: 1000,
    icon: 'MAU',
    trend: { value: 10, isPositive: true },
  },
  {
    title: 'CONTENTS',
    value: 1000,
    icon: 'CONTENTS',
    trend: { value: 10, isPositive: true },
  },
  {
    title: 'NEW_USERS',
    value: 1000,
    icon: 'NEW_USERS',
    trend: { value: 10, isPositive: true },
  },
  {
    title: 'REFERRAL',
    value: 1000,
    icon: 'REFERRAL',
    trend: { value: 10, isPositive: true },
  },
];

export const statTitleMap = {
  DAU: '일간 활성 사용자 (DAU)',
  MAU: '월간 활성 사용자 (MAU)',
  CONTENTS: '콘텐츠 수 (3개월)',
  NEW_USERS: '신규 사용자',
  REFERRAL: '유입 경로',
} as const;
