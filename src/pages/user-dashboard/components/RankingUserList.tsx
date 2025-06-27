import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import RankingUserItem from './RankingUserItem';


export default function RankingUserList() {
  return (
    <section className='flex flex-col w-full gap-4 '>
      {/* 랭킹 헤더 */}
      <div className='flex items-center gap-2 '>
        <h2 className='text-xl font-bold text-[#545454]'>이번주 랭킹 유저</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className='w-5 h-5 text-[#afaeae] cursor-pointer' />
            </TooltipTrigger>
            <TooltipContent
              side='right'
              sideOffset={10}>
              <p className=' border-1 border-[#213B6B/20] mb-5 px-4 py-2 text-sm font-medium text-[#213B6B] bg-white shadow-sm rounded-tr-md rounded-br-md rounded-tl-md' >1시간 마다 갱신됩니다.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* 랭킹 */}
      <RankingUserItem />
    </section>
  );
}
