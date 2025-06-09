type EventItem = {
  id: string;
  title: string;
  target: string;
  uploadTime: string;
  status: '대기중' | '진행중' | '전송완료';
  message: string;
  browser: string;
  createdAt: string;
  author: string;
};