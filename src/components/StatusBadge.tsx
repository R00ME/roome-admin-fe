import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'admin' | 'manager' | 'user' | 'pending' | 'approved' | 'rejected';
  className?: string;
}

const statusStyles = {
  // 관리자 등급
  admin: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  manager: 'bg-purple-100 text-purple-700 hover:bg-purple-100',
  user: 'bg-gray-100 text-gray-700 hover:bg-gray-100',

  // 업로드 상태
  pending: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
  approved: 'bg-green-100 text-green-700 hover:bg-green-100',
  rejected: 'bg-red-100 text-red-700 hover:bg-red-100',
} as const;

const statusText = {
  admin: '관리자',
  manager: '매니저',
  user: '일반',
  pending: '대기중',
  approved: '승인됨',
  rejected: '거절됨',
} as const;

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <Badge
      variant='secondary'
      className={cn(
        'font-medium',
        'user-select-none',
        statusStyles[status],
        className,
      )}>
      {statusText[status]}
    </Badge>
  );
};
