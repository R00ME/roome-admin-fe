interface TableHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tabs?: {
    value: string;
    label: string;
  }[];
  defaultTab?: string;
}

interface TableFooterProps {
  onAddItem: () => void;
  buttonText: string;
}

type AdminRole = '운영 관리자' | '시스템 관리자' | '일반 관리자';

interface AdminRoleCellProps {
  role: AdminRole;
}

interface DeleteCellProps {
  onClick: () => void;
}

interface UrlCellProps {
  url: string;
}
