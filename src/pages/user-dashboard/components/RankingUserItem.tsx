import defaultImage from '@/assets/images/default-profile-img.jpg';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchRankingList } from '../../../apis/userdashboard';
import { Card } from '../../../components/ui/card';
import { RankingItem } from '../../../types/user-dashboard';

export default function RankingUserItem() {
  const [rankingData, setRankingData] = useState<RankingItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const data = await fetchRankingList();
        setRankingData(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    };
    fetchRankingData();
  }, []);

  return (
    <Card className='w-full max-h-170 px-10 space-y-2 h-full overflow-y-auto bg-[#fcfcfc]'>
      {rankingData.map((item, index) => {
        const isTop3 = index < 3;
        const rankColor = isTop3
          ? ['text-yellow-400', 'text-gray-400', 'text-amber-600'][index]
          : 'text-gray-300';

        const isNew = item.rankDiff === 'NEW';

        const up = typeof item.rankDiff === 'number' && item.rankDiff > 0;
        const down = typeof item.rankDiff === 'number' && item.rankDiff < 0;

        return (
          <div
            key={item.userId}
            className={`flex items-center justify-center gap-4 pb-4 ${
              index < rankingData.length - 1 ? 'border-b-2 border-muted/70' : ''
            }`}>
            {/* 순위 */}
            <span className={`font-semibold ${rankColor}`}>{index + 1}</span>
            <Avatar>
              <AvatarImage
                src={item.profileImage ?? defaultImage}
                className='rounded-full w-9 h-9 border-1'
              />
              <AvatarFallback>{item.nickname}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <div className='flex justify-between text-sm font-medium'>
                <span>{item.nickname}</span>
                <div className='flex items-center gap-1 font-semibold text-xs'>
                  <span>{item.score}</span>
                  {isNew ? (
                    <span className='px-1 py-0.5 rounded bg-amber-100 text-blue-600'>
                      NEW
                    </span>
                  ) : up ? (
                    <ArrowUp className='w-3 h-3 text-blue-500' />
                  ) : down ? (
                    <ArrowDown className='w-3 h-3 text-red-500' />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
}
