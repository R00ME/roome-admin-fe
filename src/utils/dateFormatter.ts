/**
 * 날짜를 한국 시간 기준으로 포맷팅하는 유틸리티 함수
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 포맷팅된 한국어 날짜 문자열 (예: "2025년 5월 9일 오후 2시 37분")
 */
export const formatKoreanDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);

    // 한국 시간대로 변환 (UTC+9)
    const koreanDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

    const year = koreanDate.getUTCFullYear();
    const month = koreanDate.getUTCMonth() + 1;
    const day = koreanDate.getUTCDate();
    const hours = koreanDate.getUTCHours();
    const minutes = koreanDate.getUTCMinutes();

    // 오전/오후 구분
    const period = hours >= 12 ? '오후' : '오전';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

    return `${year}년 ${month}월 ${day}일 ${period} ${displayHours}시 ${minutes
      .toString()
      .padStart(2, '0')}분`;
  } catch (error) {
    console.error('날짜 포맷팅 오류:', error);
    return dateString; // 오류 시 원본 문자열 반환
  }
};

/**
 * 날짜를 한국 시간 기준으로 간단하게 포맷팅하는 함수
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 포맷팅된 한국어 날짜 문자열 (예: "2025.05.09 14:37")
 */
export const formatKoreanDateTimeShort = (dateString: string): string => {
  try {
    const date = new Date(dateString);

    // 한국 시간대로 변환 (UTC+9)
    const koreanDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

    const year = koreanDate.getUTCFullYear();
    const month = (koreanDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = koreanDate.getUTCDate().toString().padStart(2, '0');
    const hours = koreanDate.getUTCHours().toString().padStart(2, '0');
    const minutes = koreanDate.getUTCMinutes().toString().padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  } catch (error) {
    console.error('날짜 포맷팅 오류:', error);
    return dateString;
  }
};
