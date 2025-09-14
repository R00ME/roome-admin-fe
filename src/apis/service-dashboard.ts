import axiosInstance from './axiosInstance';
import type {
  DashboardSummaryResponse,
  DashboardChartResponse,
  DashboardAISummaryResponse,
} from '../types/service-dashboard';

// ===== 서비스 대시보드 API 함수들 =====

/**
 * 서비스 사용 지표 카드 인덱스 조회
 * GET /api/admin/dashboard/summary
 * @returns Promise<DashboardSummaryResponse> - MAU, DAU, 콘텐츠 등록수, 신규 사용자수, 유입 경로 데이터
 */
export const getDashboardSummary =
  async (): Promise<DashboardSummaryResponse> => {
    console.log('API URL:', axiosInstance.defaults.baseURL);
    console.log(
      'Full URL:',
      `${axiosInstance.defaults.baseURL}/api/admin/dashboard/summary`,
    );
    const response = await axiosInstance.get('/api/admin/dashboard/summary');
    return response.data;
  };

/**
 * 서비스 사용 지표 차트 조회(주간)
 * GET /api/admin/dashboard/chart?typeId={typeId}
 * @param typeId 차트 타입 ID
 * @returns Promise<DashboardChartResponse> - 주간 차트 데이터 (날짜별 값)
 */
export const getDashboardChart = async (
  typeId: string,
): Promise<DashboardChartResponse> => {
  const response = await axiosInstance.get(
    `/api/admin/dashboard/chart?typeId=${typeId}`,
  );
  return response.data;
};

/**
 * 서비스 사용 지표 요약 조회(AI)
 * GET /api/admin/dashboard/ai-summary
 * @returns Promise<DashboardAISummaryResponse> - AI가 생성한 서비스 사용 지표 요약
 */
export const getDashboardAISummary =
  async (): Promise<DashboardAISummaryResponse> => {
    const response = await axiosInstance.get('/api/admin/dashboard/ai-summary');
    return response.data;
  };
