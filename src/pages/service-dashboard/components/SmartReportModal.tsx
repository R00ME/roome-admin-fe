import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import SparklesIcon from '@/assets/icons/service-dashboard/sparkle-icon.svg?react';

interface SmartReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SmartReportModal = ({ open, onOpenChange }: SmartReportModalProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}>
      <DialogContent className='max-w-lg p-6'>
        <DialogHeader className='flex flex-row items-center justify-between space-y-0 p-4 pb-0'>
          <DialogTitle className='text-lg font-medium text-[#4983EF] flex items-center gap-2'>
            스마트 리포트
            <SparklesIcon className='w-4 h-4 opacity-50' />
          </DialogTitle>
          <Select defaultValue='1month'>
            <SelectTrigger className='w-[85px] bg-white shadow-none border-gray-300 text-sm'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1month'>1개월</SelectItem>
              <SelectItem value='3month'>3개월</SelectItem>
              <SelectItem value='6month'>6개월</SelectItem>
              <SelectItem value='1year'>1년</SelectItem>
            </SelectContent>
          </Select>
        </DialogHeader>

        {/* 날짜 표시 */}
        <div className='w-full bg-blue-50 rounded-full py-2 px-4 text-center text-gray-600 font-medium'>
          <Select defaultValue='04'>
            <SelectTrigger className='w-full bg-transparent border-none text-center text-lg font-medium shadow-none cursor-default'>
              <SelectValue placeholder='월 선택' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <SelectItem
                  key={month}
                  value={month.toString().padStart(2, '0')}>
                  {month}월
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 주목할 주요 소식 */}
        <div className='space-y-5'>
          <h3 className='text-base font-semibold text-gray-800'>
            주목할 주요 소식
          </h3>

          <div className='space-y-5'>
            {/* 첫 번째 소식 */}
            <div className='space-y-2'>
              <p className='font-medium text-gray-800 text-sm'>
                1. 최근 3개월 이내 가장 많이 사용하는 기능은 000 입니다.
              </p>
              <div className='text-xs text-gray-600 space-y-1 pl-3'>
                <p>- 수치 : 이용횟수 (클릭이나 볼륨 만족했을 때 사용량)</p>
                <p>- 수집내강 개인정보 (본 위의의 작 철때 개인정보)</p>
                <p>- 보유이용기간 (수집 시~위의내용일로부터 6개월)</p>
                <p>
                  - 동의를 거부할 권리가 있으며, 동의 거부에 따라
                  불이익(민원신청 불가) 조치 등 있을 수 있음
                </p>
              </div>
            </div>

            {/* 두 번째 소식 */}
            <div className='space-y-2'>
              <p className='font-medium text-gray-800 text-sm'>
                2. 가장 이탈률이 많은 기능은 000 입니다.
              </p>
              <div className='text-xs text-gray-600 space-y-1 pl-3'>
                <p>- 수치 : 이용횟수 (클릭이나 볼륨 만족했을 때 사용량)</p>
                <p>- 수집내강 개인정보 (본 위의의 작 철때 개인정보)</p>
                <p>- 보유이용기간 (수집 시~위의내용일로부터 6개월)</p>
                <p>
                  - 동의를 거부할 권리가 있으며, 동의 거부에 따라
                  불이익(민원신청 불가) 조치 등 있을 수 있음
                </p>
              </div>
            </div>

            {/* 세 번째 소식 */}
            <div className='space-y-2'>
              <p className='font-medium text-gray-800 text-sm'>
                3. 0000 경로에서 가장 많은 사용자가 유입되었습니다.
              </p>
              <div className='text-xs text-gray-600 space-y-1 pl-3'>
                <p>- 수치 : 이용횟수 (클릭이나 볼륨 만족했을 때 사용량)</p>
                <p>- 수집내강 개인정보 (본 위의의 작 철때 개인정보)</p>
                <p>- 보유이용기간 (수집 시~위의내용일로부터 6개월)</p>
                <p>
                  - 동의를 거부할 권리가 있으며, 동의 거부에 따라
                  불이익(민원신청 불가) 조치 등 있을 수 있음
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <div className='flex justify-end pt-6'>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            className='px-8 py-2 border-gray-300 text-gray-600 hover:bg-gray-50 text-sm rounded-sm'>
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SmartReportModal;
