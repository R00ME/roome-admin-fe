import type { ServiceDashboardType } from '@/types/service-dashboard';

export const chartTitles: Record<ServiceDashboardType, string> = {
  DAU: '일간 활성 사용자 (DAU)',
  MAU: '월간 활성 사용자 (MAU)',
  INFLOW: '신규 사용자',
  CONTENT: '콘텐츠 등록 수',
  REFERRAL: '유입 경로 분석',
};

export const chartDescriptions: Record<ServiceDashboardType, string> = {
  DAU: '최근 7일간 일간 활성 사용자 추이',
  MAU: '최근 6개월간 월간 활성 사용자 추이',
  INFLOW: '최근 7일간 일간 활성 사용자 추이',
  CONTENT: '최근 6개월간 전체 컨텐츠 등록 수 추이',
  REFERRAL: '어제 기준 사용자가 유입된 URL의 유입량 추이',
};
