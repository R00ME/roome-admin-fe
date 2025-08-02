import {
  isValidEmail,
  isValidPhoneNumber,
  isRequired,
  isValidLength,
} from './validation';
import type { AdminInviteRequest } from '@/types/admins';

/**
 * 운영자 초대 폼 유효성 검사 결과
 */
export interface AdminInviteValidationResult {
  isValid: boolean;
  errors: {
    adminName?: string;
    adminEmail?: string;
    phoneNumber?: string;
  };
}

/**
 * 운영자 초대 폼 유효성 검사
 * @param data - 검사할 폼 데이터
 * @returns 유효성 검사 결과
 */
export const validateAdminInviteForm = (
  data: AdminInviteRequest,
): AdminInviteValidationResult => {
  const errors: AdminInviteValidationResult['errors'] = {};

  // 이름 검사
  if (!isRequired(data.adminName)) {
    errors.adminName = '이름을 입력해주세요.';
  } else if (!isValidLength(data.adminName, 2, 20)) {
    errors.adminName = '이름은 2자 이상 20자 이하로 입력해주세요.';
  }

  // 이메일 검사
  if (!isRequired(data.adminEmail)) {
    errors.adminEmail = '이메일을 입력해주세요.';
  } else if (!isValidEmail(data.adminEmail)) {
    errors.adminEmail = '올바른 이메일 형식을 입력해주세요.';
  }

  // 전화번호 검사
  if (!isRequired(data.phoneNumber)) {
    errors.phoneNumber = '전화번호를 입력해주세요.';
  } else if (!isValidPhoneNumber(data.phoneNumber)) {
    errors.phoneNumber =
      '올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * 운영자 초대 폼 에러 메시지 생성
 * @param data - 검사할 폼 데이터
 * @returns 첫 번째 에러 메시지 또는 null
 */
export const getAdminInviteFormError = (
  data: AdminInviteRequest,
): string | null => {
  const validation = validateAdminInviteForm(data);

  if (validation.isValid) return null;

  // 첫 번째 에러 메시지 반환
  const firstError = Object.values(validation.errors)[0];
  return firstError || null;
};
