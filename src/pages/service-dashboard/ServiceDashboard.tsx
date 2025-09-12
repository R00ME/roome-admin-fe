import { useState, useEffect } from 'react';
import StatCardGrid from './components/StatCardGrid';
import ServiceReport from './components/ServiceReport';
import DashboardTitle from '@/components/DashboardTitle';
import ServiceChart from './components/ServiceChart';
import SplitText from '@/components/react-bits/SplitText';
import CircularText from '@/components/react-bits/CircularText';
import {
  getDashboardSummary,
  getDashboardChart,
  getDashboardAISummary,
} from '@/apis/service-dashboard';
import type {
  ServiceDashboardType,
  DashboardSummaryResponse,
  DashboardChartResponse,
  DashboardAISummaryResponse,
} from '@/types/service-dashboard';

const ServiceDashboard = () => {
  const [selectedCard, setSelectedCard] = useState<ServiceDashboardType>('DAU');

  // API 데이터 상태 (하위 컴포넌트에서 사용 예정)
  const [summaryData, setSummaryData] = useState<DashboardSummaryResponse>([]);
  const [chartData, setChartData] = useState<DashboardChartResponse | null>(
    null,
  );
  const [aiSummaryData, setAiSummaryData] =
    useState<DashboardAISummaryResponse | null>(null);

  // 현재는 사용하지 않지만 하위 컴포넌트 수정 후 사용 예정
  console.log('API 데이터:', { summaryData, chartData, aiSummaryData });

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API 데이터 로드
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 병렬로 모든 API 호출
        const [summary, aiSummary] = await Promise.all([
          getDashboardSummary(),
          getDashboardAISummary(),
        ]);

        setSummaryData(summary);
        setAiSummaryData(aiSummary);
      } catch (err) {
        console.error('대시보드 데이터 로드 실패:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // 선택된 카드에 따른 차트 데이터 로드
  useEffect(() => {
    const loadChartData = async () => {
      if (!selectedCard) return;

      try {
        const chart = await getDashboardChart(selectedCard);
        setChartData(chart);
      } catch (err) {
        console.error('차트 데이터 로드 실패:', err);
      }
    };

    loadChartData();
  }, [selectedCard]);

  const handleCardSelect = (cardTitle: ServiceDashboardType) => {
    setSelectedCard(cardTitle);
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <section>
        <DashboardTitle
          title='서비스 대시보드'
          tooltipContent='서비스의 주요 지표와 통계를 한눈에 확인할 수 있는 대시보드입니다.'
        />
        <div className='flex flex-col items-center justify-center h-96 space-y-8'>
          <CircularText
            text='LOADING'
            spinDuration={3}
            className='w-32 h-32'
          />
          <SplitText
            text='데이터를 불러오는 중...'
            className='text-lg text-gray-500'
            tag='p'
            delay={50}
            duration={0.8}
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>
      </section>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <section>
        <DashboardTitle
          title='서비스 대시보드'
          tooltipContent='서비스의 주요 지표와 통계를 한눈에 확인할 수 있는 대시보드입니다.'
        />
        <div className='flex items-center justify-center h-64'>
          <div className='text-lg text-red-500'>{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <DashboardTitle
        title='서비스 대시보드'
        tooltipContent='서비스의 주요 지표와 통계를 한눈에 확인할 수 있는 대시보드입니다.'
      />
      <div className='grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 mb-12'>
        <StatCardGrid
          selectedCard={selectedCard}
          onCardSelect={handleCardSelect}
          data={summaryData}
        />
        <ServiceReport data={aiSummaryData} />
      </div>
      <DashboardTitle
        title='상세 지표 차트'
        tooltipContent='서비스의 주요 지표와 통계를 한눈에 확인할 수 있는 대시보드입니다.'
      />
      <ServiceChart
        selectedCard={selectedCard}
        data={chartData}
      />
    </section>
  );
};

export default ServiceDashboard;
