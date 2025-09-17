interface UserDetailDrawerProps {
  open: boolean;
  onClose: () => void;
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

interface PreferredFunctionTableProps {
  headers: string[];
  rows: FeatureStat[];
  getRowKey?: (row: FeatureStat, index: number) => string | number;
  className?: string;
  fullWidth?: boolean;
}

interface DrawerActionsProps {
  onClose: () => void;
}

export type RankStatus = 'NORMAL' | 'NEW';
export type RankDiff = number | 'NEW';

export interface RankingItem {
  userId: number;
  nickname: string;
  profileImage: string;
  score: number;
  rank: number;
  rankDiff: RankDiff;
  scoreDiff: number | null;
  status: RankStatus;
}

export interface RankingsData {
  snapshotDate: string;
  rankings: RankingItem[];
}

type UserStatus = 'ONLINE' | 'OFFLINE';

type Gender = 'FEMALE' | 'MALE' | 'UNKNOWN';

interface PagingUtil {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  totalPageGroups: number;
  pageGroupSize: number;
  pageGroup: number;
  startPage: number;
  endPage: number;
  existPrePageGroup: boolean;
  existNextPageGroup: boolean;
}

interface UserInfoResponse {
  userId: number;
  email: string;
  nickname: string;
  gender: string | null;
  lastLogin: string | null;
  createdAt: string;
  status: string;
}

interface UserActivityItem {
  userId: number;
  email: string;
  nickname: string | null;
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
  lastLogin: string | null;
  createdAt: string;
  status: 'ONLINE' | 'OFFLINE' | string;
  mostUsedDomain: string | null;
  domainCount: number;
  profileImage?: string;
}

interface RawUserActivityItem {
  userInfoResponse: {
    userId: number;
    email: string;
    nickname: string;
    gender: string;
    lastLogin: string;
    createdAt: string;
    status: UserStatus;
  };
  mostUsedDomainResponse: {
    domain: string | null;
    count: number;
  };
}

export interface Paging {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

export interface UserActivityResult {
  items: UserActivityItem[];
  paging: Paging;
}

type LoadArgs = { page?: number; size?: number };

type UAState = {
  data: UserActivityItem[];
  paging?: UserActivityResult['paging'];
  error?: string | null;
};

type SortKey = 'name' | 'date';

interface FeatureStat {
  feature: string;
  apiRequestCount: number;
  usageTime: string;
  lastUsedAt: string;
  contentCount: number;
}

interface PreferredFunctionsGraphProps {
  data: FeatureStat[];
}

interface UserActivityTime {
  timeRange: string;  
  count: number;      
  ratio: number;   
}

interface TrendPoint {
  month: string;
  earnedPoints: number;
  usedPoints: number;
}

interface DomainCount {
  domain: string;
  count: number;
  ratio: number;
}

interface DomainChartData {
  domain: string;
  이번달: number;
  평균: number;
}