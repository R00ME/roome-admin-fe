type AdminRole = '운영 관리자' | '시스템 관리자' | '일반 관리자';

interface AdminItem {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  url: string;
  accessTime: string;
  createdAt: string;
}

type AdminModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

interface AdminData {
  name: string;
  email: string;
  role: 'operation' | 'system';
  permissions: string[];
}

interface Permission {
  text: string;
  description?: string;
}
