export type AdminRole = '운영 관리자' | '시스템 관리자' | '일반 관리자';

export interface AdminRoleCellProps {
  role: AdminRole;
}

export interface AdminItem {
  id?: string;
  name: string;
  email: string;
  role: AdminRole;
  url?: string;
  accessTime?: string;
  createdAt?: string;
  permissions?: string[];
}

export interface AdminData {
  name: string;
  email: string;
  role: AdminRole;
  permissions: string[];
}

export interface AdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface Permission {
  text: string;
  description?: string;
}
