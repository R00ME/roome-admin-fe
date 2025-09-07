// 이벤트 상태
export type EventStatus = 'NOTYET' | 'ONGOING' | 'ENDED';

// 이벤트 수신 대상
export type EventReceiverTarget = 'ALL';

// 이벤트 아이템
export interface EventItem {
  eventId: number;
  eventTitle: string;
  receiverTarget: string;
  uploadTime: string;
  eventMessage: string;
  createdAt: string;
  writer: string;
  status: EventStatus;
}

// 이벤트 목록 조회 응답
export interface EventListResponse {
  success: boolean;
  data: {
    pagingUtil: {
      totalElements: number;
      totalPages: number;
      pageNumber: number;
      pageSize: number;
      totalPageGroups: number;
      pageGroupSize: number;
      pageGroup: number;
      startPage: number;
      endPage: number;
      existPrePageGroup: boolean;
      existNextPageGroup: boolean;
    };
    content: EventItem[];
  };
  code: string | null;
  message: string | null;
}

// 이벤트 생성 요청
export interface CreateEventRequest {
  eventTitle: string;
  eventContent: string;
  startDate: string;
  endDate: string;
  eventUploadTime: string;
  eventReceiverTarget: EventReceiverTarget;
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
