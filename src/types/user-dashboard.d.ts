export interface UserActivityItem{
  nickname: string
  email: string
  lastActive: string
  url: string
  browser: string
  joinedAt: string
}
interface UserDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  user: UserActivityItem | null;
}

interface PreferredFunctionRow {
  name: string;
  isNew?: boolean;
  apiCount: number | string;
  usageTime: string;
  lastUsed: string;
  contentCount: number | string;
  likeCount: number | string;
}

interface PreferredFunctionsTableProps {
  rows: PreferredFunctionRow[];
}

interface GenericTableProps<T extends Record<string, any>> {
  headers: string[];
  rows: T[];
  getRowKey?: (row: T, idx: number) => string | number;
  className?: string;
}

interface DrawerActionsProps {
  onClose: () => void;
}