import {
  normalizeGender,
  toIsoString,
} from '../constants/user-dashboard/userActivity';
import {
  RawUserActivityItem,
  UserActivityItem,
  UserActivityResult,
} from '../types/user-dashboard';
import axiosInstance from './axiosInstance';

const API_URL ='api';

/**
 * 이번 주 랭킹 조회
 * @returns {Promise<RankingItem[]>}
 */
export const fetchRankingList = async () => {
  try {
    const { data } = await axiosInstance.get(`/${API_URL}/admin/rankings`);

    return data;
  } catch (error) {
    console.error('🚨 랭킹 데이터 패치 실패:', error);
    throw error;
  }
};

/**
 * 최근 사용자 활동 조회
 * @param page 기본 1 페이지
 * @param size 기본 10
 * @returns {Promise<UserActivityResult>}
 */
export const fetchRecentUserActivity = async (
  page = 1,
  size = 10,
): Promise<UserActivityResult> => {
  try {
    const { data } = await axiosInstance.get(
      `/${API_URL}/admin/usage/recent-user-activity`,
      { params: { page, size } },
    );

    const payload = data?.data;
    const content = payload?.content ?? [];
    const pagingUtil = payload?.pagingUtil ?? null;

    const items: UserActivityItem[] = (content as RawUserActivityItem[]).map(
      (row) => {
        const u = row.userInfoResponse ?? ({} as RawUserActivityItem['userInfoResponse']);
        const m = row.mostUsedDomainResponse ?? { domain: null, count: 0 };

        return {
          userId: u.userId,
          email: u.email,
          nickname: u.nickname ?? null,
          gender: normalizeGender(u.gender),         
          lastLogin: toIsoString(u.lastLogin) ?? '',       
          createdAt: toIsoString(u.createdAt)!,      
          status: u.status,
          mostUsedDomain: m.domain ?? ' ',
          domainCount: m.count ?? 0,
        };
      },
    );

    const paging = {
      totalElements: pagingUtil?.totalElements ?? items.length,
      totalPages:    pagingUtil?.totalPages    ?? 1,
      pageNumber:    pagingUtil?.pageNumber    ?? page,
      pageSize:      pagingUtil?.pageSize      ?? size,
    };

    return { items, paging };
  } catch (error) {
    console.error('🚨 최근 사용자 활동 데이터 패치 실패:', error);
    throw error;
  }
};

/**
 * 선호하는 기능 조회
 * @param userId 
 * @returns {Promise<FeatureStat[]>}
 */
export const fetchUserFeature = async(userId: number) => {
  try{
    const { data } = await axiosInstance.get(`/${API_URL}/admin/usage/${userId}/feature-stats/details`);

    return data.data.featureStats;
    console.log('data',data.data.featureStats);
  } catch(error){
    console.error('🚨 선호하는 기능 데이터 패치 실패:', error);
    throw error;
  }
}

/**
 * 컨텐츠 발행 추이
 * @param userId 
 * @returns {Promise<UserActivityResult>}
 */
export const fetchContentPublish = async(userId: number) => {
  try{
    const { data } = await axiosInstance.get(`/${API_URL}/admin/usage/${userId}/user-domain-stats`,);

    return data;
  } catch(error){
    console.error('🚨 컨텐츠 발행 추이 데이터 패치 실패:', error);
    throw error;
  }
}

/**
 * 포인트 발행 추이
 * @param userId 
 * @returns {Promise<UserActivityResult>}
 */
export const fetchPointIssue = async(userId: number) => {
  try{
    const { data } = await axiosInstance.get(`/${API_URL}/admin/usage/${userId}/points/trend`,);

    return data.data.trend;
  } catch(error){
    console.error('🚨 포인트 발행 추이 데이터 패치 실패:', error);
    throw error;
  }
}

/**
 * 사용자 활동 시간대
 * @param userId 
 * @returns {Promise<UserActivityResult>}
 */
export const fetchUserActiveTime = async(userId: number) => {
  try{
    const { data } = await axiosInstance.get(`/${API_URL}/admin/usage/${userId}/activity-time`,);

    return data.data.activityTime;
  } catch(error){
    console.error('🚨 사용자 활동 시간대 데이터 패치 실패:', error);
    throw error;
  }
}

