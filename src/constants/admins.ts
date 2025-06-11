import type {
  AdminData,
  AdminItem,
  AdminRole,
  Permission,
} from '@/types/admins';

export const MOCK_DATA: AdminItem[] = [
  {
    id: '1',
    name: '고광희',
    email: 'test02@naver.com',
    role: '운영 관리자',
    url: 'https://www.room-e.com/1002',
    accessTime: '오늘, PM 04:20',
    createdAt: '2025-04-24',
  },
  {
    id: '2',
    name: '고광희',
    email: 'test02@naver.com',
    role: '시스템 관리자',
    url: 'https://www.room-e.com/1002',
    accessTime: '오늘, PM 04:20',
    createdAt: '2025-04-24',
  },
  {
    id: '3',
    name: '고광희',
    email: 'test02@naver.com',
    role: '시스템 관리자',
    url: 'https://www.room-e.com/1002',
    accessTime: '오늘, PM 04:20',
    createdAt: '2025-04-24',
  },
];

export const initialState: AdminData = {
  name: '',
  email: '',
  role: '운영 관리자',
  permissions: [],
};

export const ADMIN_PERMISSIONS: Record<AdminRole, Permission[]> = {
  '운영 관리자': [
    { text: '운영 기능 사용 가능', description: '관리자 타입 지정' },
    { text: '서비스 사용성 분석 대시보드 사용 가능' },
    { text: '사용자 분석 대시보드 사용 가능' },
  ],
  '시스템 관리자': [{ text: '시스템 대시보드 사용 가능' }],
  '일반 관리자': [],
};

export const ADMIN_TYPES = [
  { value: '운영 관리자', label: '운영 관리자' },
  { value: '시스템 관리자', label: '시스템 관리자' },
  { value: '일반 관리자', label: '일반 관리자' },
];
