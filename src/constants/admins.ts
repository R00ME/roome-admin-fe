import type { AdminItem, AdminRole, Permission } from '@/types/admins';

// API 응답 형식에 맞는 더미데이터
export const MOCK_DATA: AdminItem[] = [
  {
    id: 1,
    name: '최고 관리자',
    email: 'super@admin.com',
    role: 'SUPER_ADMIN',
  },
  {
    id: 2,
    name: '시스템 관리자',
    email: 'system@admin.com',
    role: 'SYSTEM_MANAGER',
  },
  {
    id: 3,
    name: '운영 관리자',
    email: 'operation@admin.com',
    role: 'OPERATION_MANAGER',
  },
  {
    id: 4,
    name: '구인영',
    email: '9noeyni9@gmail.com',
    role: 'OPERATION_MANAGER',
  },
];

export const ADMIN_PERMISSIONS: Record<AdminRole, Permission[]> = {
  SUPER_ADMIN: [
    { text: '모든 기능 사용 가능', description: '최고 관리자 권한' },
    { text: '운영자 초대 및 관리', description: '새로운 운영자 초대 가능' },
    { text: '시스템 설정 관리', description: '시스템 전체 설정 변경 가능' },
  ],
  SYSTEM_MANAGER: [
    { text: '시스템 관리 기능 사용', description: '시스템 관리자 권한' },
    {
      text: '시스템 대시보드 사용 가능',
      description: '시스템 분석 데이터 확인',
    },
  ],
  OPERATION_MANAGER: [
    { text: '운영 기능 사용 가능', description: '운영 관리자 권한' },
    {
      text: '서비스 사용성 분석 대시보드 사용 가능',
      description: '서비스 분석 데이터 확인',
    },
    {
      text: '사용자 분석 대시보드 사용 가능',
      description: '사용자 분석 데이터 확인',
    },
  ],
};

// 초대 가능한 관리자 타입 (최고 관리자 제외)
export const ADMIN_TYPES = [
  { value: 'SYSTEM_MANAGER', label: '시스템 관리자' },
  { value: 'OPERATION_MANAGER', label: '운영 관리자' },
];
