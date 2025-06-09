export interface SearchItem {
  id: string;
  title: string;
  keywords: string[];
  path: string;
  description: string;
  category: '서비스 자원' | '자바스크립트' | '자바스크립트 오류';
}

export const SEARCH_ITEMS: SearchItem[] = [
  {
    id: 'service-analysis',
    title: '서비스 분석',
    keywords: ['서비스', '분석', '통계', '대시보드'],
    path: '/dashboard/service',
    description: '서비스 사용 현황 및 통계 분석',
    category: '서비스 자원',
  },
  {
    id: 'user-analysis',
    title: '사용자 분석',
    keywords: ['사용자', '회원', '분석', '통계'],
    path: '/dashboard/user',
    description: '사용자 행동 패턴 및 통계 분석',
    category: '서비스 자원',
  },
  {
    id: 'system-management',
    title: '운영 시스템',
    keywords: ['시스템', '운영', '관리', '설정'],
    path: '/dashboard/system',
    description: '서비스 운영 시스템 관리',
    category: '서비스 자원',
  },
  {
    id: 'event-management',
    title: '이벤트 관리',
    keywords: ['이벤트', '프로모션', '관리', '마케팅'],
    path: '/events',
    description: '이벤트 및 프로모션 관리',
    category: '서비스 자원',
  },
  {
    id: 'admin-management',
    title: '운영자 관리',
    keywords: ['운영자', '관리자', '권한', '계정'],
    path: '/admins',
    description: '운영자 계정 및 권한 관리',
    category: '서비스 자원',
  },
];
