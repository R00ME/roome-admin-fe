import StatCard from './StatCard';
import { statCards } from '@/constants/service-dashboard/stat-card';
import { IconType } from '@/types/service-dashboard/stat-card.type';

interface StatCardGridProps {
  selectedCard: IconType;
  onCardSelect: (cardTitle: IconType) => void;
}

const StatCardGrid = ({ selectedCard, onCardSelect }: StatCardGridProps) => {
  return (
    <div className='grid grid-cols-1 gap-y-4 border border-gray-200 bg-gray-50 rounded-lg md:grid-cols-2 lg:grid-cols-3 overflow-visible'>
      {statCards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          trend={card.trend}
          isActive={card.title === selectedCard}
          onClick={() => onCardSelect(card.title)}
        />
      ))}
    </div>
  );
};

export default StatCardGrid;
