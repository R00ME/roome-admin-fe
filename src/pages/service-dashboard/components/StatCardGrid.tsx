import StatCard from './StatCard';
import { statCards } from '@/constants/service-dashboard/stat-card';
import type {
  ServiceDashboardType,
  DashboardSummaryResponse,
} from '@/types/service-dashboard';

interface StatCardGridProps {
  selectedCard: ServiceDashboardType;
  onCardSelect: (cardTitle: ServiceDashboardType) => void;
  data?: DashboardSummaryResponse;
}

const StatCardGrid = ({
  selectedCard,
  onCardSelect,
  data,
}: StatCardGridProps) => {
  // API 데이터를 기반으로 카드 데이터 생성
  const getCardData = (
    cardTitle: ServiceDashboardType,
  ): {
    title: ServiceDashboardType;
    value: string | number;
    icon: ServiceDashboardType;
    trend: { value: number; isPositive: boolean };
    unit?: string;
  } => {
    if (!data) {
      // 데이터가 없으면 기본값 사용
      return (
        statCards.find((card) => card.title === cardTitle) || {
          title: cardTitle,
          value: '0',
          icon: cardTitle,
          trend: { value: 0, isPositive: true },
          unit: '',
        }
      );
    }

    // API 데이터에서 해당하는 항목 찾기
    const apiItem = data.find((item) => {
      const label = item.label;
      switch (cardTitle) {
        case 'DAU':
          return label.includes('일간') || label.includes('DAU');
        case 'MAU':
          return label.includes('월간') || label.includes('MAU');
        case 'CONTENT':
          return label.includes('콘텐츠') || label.includes('CONTENT');
        case 'INFLOW':
          return label.includes('신규') || label.includes('INFLOW');
        case 'REFERRAL':
          return label.includes('유입') || label.includes('REFERRAL');
        default:
          return false;
      }
    });

    if (apiItem) {
      // 유입 경로의 경우 특별 처리
      if (cardTitle === 'REFERRAL') {
        return {
          title: cardTitle,
          value: apiItem.value || '데이터 없음',
          icon: cardTitle,
          trend: {
            value: 0,
            isPositive: true,
          },
          unit: '',
        };
      }

      return {
        title: cardTitle,
        value: apiItem.value,
        icon: cardTitle,
        trend: {
          value: Math.abs(apiItem.changeRate || 0),
          isPositive: (apiItem.changeRate || 0) >= 0,
        },
        unit: apiItem.unit || '',
      };
    }

    // API 데이터에서 찾지 못한 경우 기본값 사용
    return (
      statCards.find((card) => card.title === cardTitle) || {
        title: cardTitle,
        value: '0',
        icon: cardTitle,
        trend: { value: 0, isPositive: true },
        unit: '',
      }
    );
  };

  return (
    <div className='grid grid-cols-1 gap-y-4 h-full border border-gray-200 bg-gray-50 rounded-lg md:grid-cols-2 lg:grid-cols-3 overflow-visible'>
      {statCards.map((card) => {
        const cardData = getCardData(card.title);
        return (
          <div
            key={card.title}
            className='h-full'>
            <StatCard
              title={cardData.title}
              value={cardData.value}
              icon={cardData.icon}
              trend={cardData.trend}
              unit={cardData.unit}
              isActive={card.title === selectedCard}
              onClick={() => onCardSelect(card.title)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StatCardGrid;
