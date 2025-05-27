import { useState } from 'react';
import StatCardGrid from './components/StatCardGrid';
import { IconType } from '@/types/service-dashboard/stat-card.type';

const ServiceDashboard = () => {
  const [selectedCard, setSelectedCard] = useState<IconType>('DAU');

  const handleCardSelect = (cardTitle: IconType) => {
    setSelectedCard(cardTitle);
  };

  return (
    <div className='p-6'>
      <StatCardGrid
        selectedCard={selectedCard}
        onCardSelect={handleCardSelect}
      />
    </div>
  );
};

export default ServiceDashboard;
