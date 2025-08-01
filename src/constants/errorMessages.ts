/**
 * 운영자 초대 관련 에러 메시지
 */
export const ADMIN_INVITE_ERROR_MESSAGES = {
  INVITE_FAILED: '초대 중 오류가 발생했습니다.',
} as const;

/**
 * 폼 유효성 검사 관련 에러 메시지
 */
export const VALIDATION_ERROR_MESSAGES = {
  REQUIRED_NAME: '이름을 입력해주세요.',
  REQUIRED_EMAIL: '이메일을 입력해주세요.',
  REQUIRED_PHONE: '전화번호를 입력해주세요.',
  INVALID_EMAIL: '올바른 이메일 형식을 입력해주세요.',
  INVALID_PHONE: '올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)',
  NAME_LENGTH: '이름은 2자 이상 20자 이하로 입력해주세요.',
} as const;
