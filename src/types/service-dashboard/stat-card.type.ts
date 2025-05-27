export type IconType = 'DAU' | 'MAU' | 'CONTENTS' | 'NEW_USERS' | 'REVISIONS';

export interface StatCardProps {
  title: IconType;
  value: string | number;
  icon: IconType;
  trend: {
    value: number;
    isPositive: boolean;
  };
  unit?: string;
  isActive?: boolean;
  onClick?: () => void;
}
