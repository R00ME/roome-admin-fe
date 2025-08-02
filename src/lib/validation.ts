/**
 * 이메일 형식 검사
 * @param email - 검사할 이메일 주소
 * @returns 유효한 이메일 형식인지 여부
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 전화번호 형식 검사 (한국 전화번호)
 * @param phone - 검사할 전화번호
 * @returns 유효한 전화번호 형식인지 여부
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$|^01[0-9]\d{7,8}$/;
  return phoneRegex.test(phone);
};

/**
 * 필수 필드 검사
 * @param value - 검사할 값
 * @returns 값이 존재하는지 여부
 */
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * 문자열 길이 검사
 * @param value - 검사할 값
 * @param min - 최소 길이
 * @param max - 최대 길이
 * @returns 길이가 유효한지 여부
 */
export const isValidLength = (
  value: string,
  min: number,
  max: number,
): boolean => {
  const length = value.trim().length;
  return length >= min && length <= max;
};
