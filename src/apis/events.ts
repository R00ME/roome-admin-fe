import axiosInstance from './axiosInstance';
import {
  EventListResponse,
  CreateEventRequest,
  EventListQuery,
} from '@/types/events';

/**
 * 이벤트 목록 조회
 * @param query - 페이지네이션 쿼리 파라미터
 * @returns 이벤트 목록과 페이지네이션 정보
 */
export const getEventList = async (
  query: EventListQuery,
): Promise<EventListResponse> => {
  const { page, pagesize } = query;

  const response = await axiosInstance.get<EventListResponse>(
    `/admin/events/list?page=${page}&pagesize=${pagesize}`,
  );

  return response.data;
};

/**
 * 이벤트 생성
 * @param eventData - 생성할 이벤트 데이터
 * @returns 생성 결과 (200 코드만 반환)
 */
export const createEvent = async (
  eventData: CreateEventRequest,
): Promise<void> => {
  await axiosInstance.post('/admin/events', eventData);
};

/**
 * 이벤트 삭제
 * @param eventId - 삭제할 이벤트 ID
 */
export const deleteEvent = async (eventId: number): Promise<void> => {
  await axiosInstance.delete(`/admin/events?eventId=${eventId}`);
};
