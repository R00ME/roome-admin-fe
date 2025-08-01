export type AdminRole = 'SUPER_ADMIN' | 'SYSTEM_MANAGER' | 'OPERATION_MANAGER';

export interface AdminItem {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
}

export interface AdminListResponse {
  content: AdminItem[];
  paging: {
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
  };
}

export interface AdminInviteRequest {
  adminRole: AdminRole;
  adminName: string;
  adminEmail: string;
  phoneNumber: string;
}

export interface AdminRoleCellProps {
  role: AdminRole;
}

export interface AdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvite?: (inviteData: AdminInviteRequest) => Promise<void>;
}

export interface Permission {
  text: string;
  description?: string;
}

export interface AdminData {
  name: string;
  email: string;
  role: AdminRole;
  permissions: string[];
}
