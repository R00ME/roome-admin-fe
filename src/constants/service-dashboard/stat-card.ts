import type { ServiceDashboardType } from '@/types/service-dashboard';

interface StatCardData {
  title: ServiceDashboardType;
  value: number;
  icon: ServiceDashboardType;
  trend: {
    value: number;
    isPositive: boolean;
  };
  unit?: string;
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
    title: 'CONTENT',
    value: 1000,
    icon: 'CONTENT',
    trend: { value: 10, isPositive: true },
  },
  {
    title: 'INFLOW',
    value: 1000,
    icon: 'INFLOW',
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
  CONTENT: '콘텐츠 수 (3개월)',
  INFLOW: '신규 사용자',
  REFERRAL: '유입 경로',
} as const;
