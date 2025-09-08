import { AdminRole } from '@/types/admins';

// 역할별 메뉴 권한 정의
export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  SUPER_ADMIN: [
    '/dashboard/service',
    '/dashboard/user',
    '/dashboard/system',
    '/events',
    '/admins',
  ],
  SYSTEM_MANAGER: ['/dashboard/system'],
  OPERATION_MANAGER: [
    '/dashboard/service',
    '/dashboard/user',
    '/events',
    '/admins',
  ],
};
