import defaultImage from '@/assets/images/default-profile-img.jpg';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Card } from '../../../components/ui/card';

export default function RankingUserItem() {
  const rankingData = [
    {
      id: '1',
      name: '구름이',
      score: 320,
      diff: 50,
      img: '',
    },
    {
      id: '2',
      name: '하늘이',
      score: 210,
      diff: -32,
      img: '',
    },
    {
      id: '3',
      name: '바람이',
      score: 199,
      diff: -60,
      img: '',
    },
    {
      id: '4',
      name: '분이라',
      score: 100,
      diff: -60,
      img: '',
    },
    {
      id: '5',
      name: '총총총',
      score: 100,
      diff: -60,
      img: '',
    },
    {
      id: '6',
      name: '땀땀땀',
      score: 100,
      diff: -60,
      img: '',
    },
    {
      id: '7',
      name: '잠잠잠',
      score: 199,
      diff: -60,
      img: '',
    },
    {
      id: '8',
      name: '슥슥슥',
      score: 199,
      diff: 60,
      img: '',
    },
    {
      id: '9',
      name: '깡총이',
      score: 199,
      diff: -60,
      img: '',
    },
  ];
  return (
    <Card className='w-full px-8 space-y-2 h-[calc(100vh-220px)] overflow-y-auto'>
      {rankingData.map((user, index) => {
        const isTop3 = index < 3;
        const rankColor = isTop3
          ? ['bg-yellow-400', 'bg-gray-400', 'bg-amber-600'][index]
          : 'bg-gray-300 text-muted-foreground';

        return (
          <div
            key={user.id}
            className={`flex items-center gap-3 pb-4 mb-2 ${index < rankingData.length - 1 ? 'border-b-2 border-muted/70' : ''}`}>
            {/* 순위 */}
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white ${rankColor}`}>
              {index + 1}
            </div>
            <Avatar>
              <AvatarImage
                src={user.img || defaultImage}
                className='rounded-full w-9 h-9 border-1'
              />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <div className='flex justify-between text-sm font-medium'>
                <span>{user.name}</span>
                <div className='flex items-center gap-1 text-muted-foreground text-xs'>
                  <span>{user.score}</span>
                  {user.diff > 0 ? (
                    <ArrowUp className='w-3 h-3 text-red-500' />
                  ) : (
                    <ArrowDown className='w-3 h-3 text-blue-500' />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
}
