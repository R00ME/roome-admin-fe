import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type EventModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EventModal = ({ open, onOpenChange }: EventModalProps) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}>
      <AlertDialogContent className='max-w-[700px]'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-blue-500 text-lg font-bold mb-4 border-b border-gray-200 pb-2'>
            이벤트 등록
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='block text-sm font-regular mb-1 text-gray-600'>
                이벤트명
              </label>
              <Input placeholder='이벤트 제목명을 입력하세요' />
            </div>
            <div className='col-span-1 row-span-2'>
              <label className='block text-sm font-regular mb-1 text-gray-600'>
                이벤트 내용
              </label>
              <Textarea
                placeholder='유저의 알림창으로 보낼 메시지를 입력하세요'
                maxLength={20}
                className='resize-none h-[80px]'
              />
              <div className='text-xs text-right text-gray-400 mt-1'>0/20</div>
            </div>
            <div>
              <label className='block text-sm font-regular mb-1 text-gray-600'>
                이벤트 시작일
              </label>
              <div className='flex gap-2'>
                <Input type='date' />
                <Input
                  type='time'
                  placeholder='시간'
                  className='w-1/2'
                  disabled
                />
              </div>
            </div>
            <div>
              <label className='block text-sm font-regular mb-1 text-gray-600'>
                이벤트 종료일
              </label>
              <div className='flex gap-2'>
                <Input type='date' />
                <Input
                  type='time'
                  placeholder='시간'
                  className='w-1/2'
                  disabled
                />
              </div>
            </div>
          </div>
          <AlertDialogFooter className='flex-row justify-end gap-2 mt-6'>
            <AlertDialogCancel className='rounded-full border px-8 py-2'>
              닫기
            </AlertDialogCancel>
            <Button
              type='submit'
              className='rounded-full px-8 py-2 bg-blue-900 text-white'>
              등록하기
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EventModal;
