import axiosInstance from '@/apis/axiosInstance';
import type {
  AdminListResponse,
  AdminInviteRequest,
  AdminDeleteResponse,
} from '@/types/admins';

const API_URL = 'api';

/**
 * 운영자 목록 조회
 * @description 슈퍼 관리자 권한으로 모든 운영자 목록 조회
 * @param {number} page - 페이지 번호 (기본값: 1)
 * @param {number} pageSize - 페이지 크기 (기본값: 10)
 * @param {string} column - 정렬 컬럼 (기본값: 'adminName')
 * @param {string} sortDirection - 정렬 방향 (기본값: 'asc')
 * @returns {Promise<AdminListResponse>} 운영자 목록과 페이징 정보
 * @throws {Error} API 요청 실패 시 에러
 *
 * @example
 * ```typescript
 * const adminList = await fetchAdminList(1, 10, 'adminName', 'asc');
 * console.log(adminList.content); // 운영자 배열
 * console.log(adminList.paging.totalElements); // 전체 운영자 수
 * ```
 */
export const fetchAdminList = async (
  page: number = 1,
  pageSize: number = 10,
  column: string = 'adminName',
  sortDirection: string = 'asc',
): Promise<AdminListResponse> => {
  try {
    const response = await axiosInstance.get(`/${API_URL}/admin/super/admins`, {
      params: {
        page,
        pageSize,
        column,
        sortDirection,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('🚨 운영자 목록 조회 실패:', error);
    throw error;
  }
};

/**
 * 운영자 초대 (회원가입)
 * @description 슈퍼 관리자 권한으로 새로운 운영자 초대
 * @param {AdminInviteRequest} inviteData - 초대할 운영자 정보
 * @returns {Promise<string>} 초대 완료 메시지
 * @throws {Error} API 요청 실패 시 에러
 *
 * @example
 * ```typescript
 * const inviteData = {
 *   adminRole: "OPERATION_MANAGER",
 *   adminName: "구인영",
 *   adminEmail: "9noeyni9@gmail.com",
 *   phoneNumber: "01064851305"
 * };
 *
 * const result = await inviteAdmin(inviteData);
 * console.log(result); // "관리자 초대 완료"
 * ```
 */
export const inviteAdmin = async (
  inviteData: AdminInviteRequest,
): Promise<string> => {
  try {
    const response = await axiosInstance.post(
      `/${API_URL}/admin/super/invitation`,
      inviteData,
    );
    return response.data.data;
  } catch (error) {
    console.error('🚨 운영자 초대 실패:', error);
    throw error;
  }
};

/**
 * 운영자 권한 삭제
 * @description 슈퍼 관리자 권한으로 운영자 권한 삭제
 * @param {number} adminId - 삭제할 운영자 ID
 * @returns {Promise<string>} 삭제 완료 메시지
 * @throws {Error} API 요청 실패 시 에러
 *
 * @example
 * ```typescript
 * const result = await deleteAdmin(123);
 * console.log(result); // "관리자 권한 회수 완료"
 * ```
 */
export const deleteAdmin = async (adminId: number): Promise<string> => {
  try {
    const response = await axiosInstance.delete<AdminDeleteResponse>(
      `/${API_URL}/admin/super/admins/${adminId}/delete`,
    );
    return response.data.data;
  } catch (error) {
    console.error('🚨 운영자 권한 삭제 실패:', error);
    throw error;
  }
};
