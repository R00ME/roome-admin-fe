import { useState } from 'react';
import StatCardGrid from './components/StatCardGrid';
import ServiceReport from './components/ServiceReport';
import DashboardTitle from '@/components/DashboardTitle';
import ServiceChart from './components/ServiceChart';

const ServiceDashboard = () => {
  const [selectedCard, setSelectedCard] = useState<IconType>('DAU');

  const handleCardSelect = (cardTitle: IconType) => {
    setSelectedCard(cardTitle);
  };

  return (
    <section>
      <DashboardTitle
        title='서비스 대시보드'
        tooltipContent='서비스의 주요 지표와 통계를 한눈에 확인할 수 있는 대시보드입니다.'
      />
      <div className='grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-12'>
        <StatCardGrid
          selectedCard={selectedCard}
          onCardSelect={handleCardSelect}
        />
        <ServiceReport />
      </div>
      <DashboardTitle
        title='일간 사용자 활성 지표'
        tooltipContent='서비스의 주요 지표와 통계를 한눈에 확인할 수 있는 대시보드입니다.'
      />
      <ServiceChart />
    </section>
  );
};

export default ServiceDashboard;
