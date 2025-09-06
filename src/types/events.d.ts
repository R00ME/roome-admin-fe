// 이벤트 아이템
export interface EventItem {
  eventId: number;
  eventTitle: string;
  receiverTarget: string;
  uploadTime: string;
  eventMessage: string;
  createdAT: string;
  writer: string;
}

// 이벤트 목록 조회 응답
export interface EventListResponse {
  currentPage: number;
  totalPage: number;
  pageSize: number;
  events: EventItem[];
}

// 이벤트 생성 요청
export interface CreateEventRequest {
  eventTitle: string;
  eventContent: string;
  startDate: string;
  endDate: string;
}

// 이벤트 목록 조회 쿼리 파라미터
export interface EventListQuery {
  page: number;
  pagesize: number;
}

export type EventModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
