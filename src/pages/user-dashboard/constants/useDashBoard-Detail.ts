export const preferredFunctionHeaders = [
  '기능',
  'API 호출 수',
  '사용 시간',
  '마지막 사용일',
  '컨텐츠 수',
];

export const COLORS = ['#3b82f6', '#1053b9', '#6ba4f5', '#445bef', '#6366f1'];

export const timeRangeEmojiMap: Record<string, string> = {
  '00:00-06:00': '🌙',
  '06:00-12:00': '🌅',
  '12:00-18:00': '☀️',
  '18:00-24:00': '🌆',
  기타: '❓',
};

export const domainMap: Record<string, string> = {
  guestbook: '방명록',
  cd: '음악',
  book: '도서',
  comment: '댓글',
  theme: '테마변경',
  etc: '기타',
};
