import { useState } from 'react';
import ContentActivityTab from './ContentActivityTab';
import PointActivityTab from './PointActivityTab';
import SummaryTab from './SummaryTab';

const TAB_LIST = [
  { value: 'summary', label: '활동 요약' },
  { value: 'point', label: '포인트 활동' },
  { value: 'content', label: '콘텐츠 활동' },
];

export default function UserActivityTabs({
  drawerWidth,
}: {
  drawerWidth: number;
}) {
  const [activeTab, setActiveTab] = useState('summary');
  return (
    <section className='w-full bg-white rounded-xl shadow p-6 min-h-[350px] flex flex-col'>
      {/* 탭 버튼 영역 */}
      <div className='flex gap-1 mb-6 border-b border-gray-200'>
        {TAB_LIST.map((tab) => (
          <button
            key={tab.value}
            className={`px-5 py-2 text-sm font-semibold rounded-t
              ${
                activeTab === tab.value
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'bg-[#F5F8FB] text-gray-400 border-b-2 border-transparent'
              }
              transition
            `}
            onClick={() => setActiveTab(tab.value)}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭별 콘텐츠 영역 */}
      <div className={`flex-1 pt-8  ${drawerWidth < 920 ? 'pr-0' : 'pr-10'} `}>
        {activeTab === 'summary' && <SummaryTab drawerWidth={drawerWidth} />}
        {activeTab === 'point' && <PointActivityTab />}
        {activeTab === 'content' && <ContentActivityTab />}
      </div>
    </section>
  );
}
