// 서비스 대시보드 타입들
type ServiceDashboardType =
  | 'DAU'
  | 'MAU'
  | 'CONTENTS'
  | 'NEW_USERS'
  | 'REFERRAL';

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

// ===== 서비스 대시보드 API 타입 정의 =====

// 1. 서비스 사용 지표 카드 인덱스 조회 API 응답 타입
export interface DashboardSummaryItem {
  label: string; // "월간 활성 사용자수(MAU)", "일간 활성 사용자수(DAU)" 등
  value: number; // 실제 수치 값
  unit: string | null; // "명", "건" 등 단위 (유입 경로의 경우 null)
  changeRate: number | null; // 변화율 (유입 경로의 경우 null)
}

export type DashboardSummaryResponse = DashboardSummaryItem[];

// 2. 서비스 사용 지표 차트 조회(주간) API 응답 타입
export interface DashboardChartDataPoint {
  xLabels: string; // "YYYY-MM-DD" 형식의 날짜
  value: string; // 차트 값 (문자열로 반환됨)
}

export interface DashboardChartResponse {
  data: DashboardChartDataPoint[];
}

// 3. 서비스 사용 지표 요약 조회(AI) API 응답 타입
export interface DashboardAISummaryResponse {
  mostUsedFeature: string; // "가장 많이 사용한 기능은 000 입니다."
  mostDroppedFeature: string; // "가장 이탈률이 많은 기능은 00 입니다."
  mostEntryPath: string; // "0000 경로에서 가장 많은 사용자가 유입되었습니다."
}
