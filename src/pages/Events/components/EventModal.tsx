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
import { memo } from 'react';
import { useEventModalStore } from '@/store/eventModalStore';

type EventModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// 모달 헤더 컴포넌트
const ModalHeader = memo(() => {
  console.log('ModalHeader 렌더링');
  return (
    <AlertDialogHeader>
      <AlertDialogTitle className='text-blue-500 text-lg font-bold mb-4 border-b border-gray-200 pb-2'>
        이벤트 등록
      </AlertDialogTitle>
    </AlertDialogHeader>
  );
});

// 모달 푸터 컴포넌트
const ModalFooter = memo(() => {
  console.log('ModalFooter 렌더링');
  return (
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
  );
});

// 이벤트 제목 입력 컴포넌트
const EventTitleInput = memo(() => {
  console.log('EventTitleInput 렌더링');
  const title = useEventModalStore((state) => state.title);
  const setTitle = useEventModalStore((state) => state.setTitle);

  return (
    <div>
      <label className='block text-sm font-regular mb-1 text-gray-600'>
        이벤트명
      </label>
      <Input
        name='title'
        placeholder='이벤트 제목명을 입력하세요'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
});

// 이벤트 내용 입력 컴포넌트
const EventContentInput = memo(() => {
  console.log('EventContentInput 렌더링');
  const content = useEventModalStore((state) => state.content);
  const setContent = useEventModalStore((state) => state.setContent);

  return (
    <div className='col-span-1 row-span-2'>
      <label className='block text-sm font-regular mb-1 text-gray-600'>
        이벤트 내용
      </label>
      <Textarea
        name='content'
        placeholder='유저의 알림창으로 보낼 메시지를 입력하세요'
        maxLength={20}
        className='resize-none h-[80px]'
        value={content}
        onChange={(e) => {
          if (e.target.value.length <= 20) {
            setContent(e.target.value);
          }
        }}
      />
      <div className='text-xs text-right text-gray-400 mt-1'>
        {content.length}/20
      </div>
    </div>
  );
});

// 날짜/시간 입력 컴포넌트
const StartDateTimeInput = memo(() => {
  console.log('StartDateTimeInput 렌더링');
  const startDate = useEventModalStore((state) => state.startDate);
  const startTime = useEventModalStore((state) => state.startTime);
  const setStartDate = useEventModalStore((state) => state.setStartDate);
  const setStartTime = useEventModalStore((state) => state.setStartTime);

  return (
    <div>
      <label className='block text-sm font-regular mb-1 text-gray-600'>
        이벤트 시작일
      </label>
      <div className='flex gap-2'>
        <Input
          type='date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type='time'
          placeholder='시간'
          className='w-1/2'
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
    </div>
  );
});

const EndDateTimeInput = memo(() => {
  console.log('EndDateTimeInput 렌더링');
  const endDate = useEventModalStore((state) => state.endDate);
  const endTime = useEventModalStore((state) => state.endTime);
  const startDate = useEventModalStore((state) => state.startDate);
  const setEndDate = useEventModalStore((state) => state.setEndDate);
  const setEndTime = useEventModalStore((state) => state.setEndTime);

  return (
    <div>
      <label className='block text-sm font-regular mb-1 text-gray-600'>
        이벤트 종료일
      </label>
      <div className='flex gap-2'>
        <Input
          type='date'
          value={endDate}
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Input
          type='time'
          placeholder='시간'
          className='w-1/2'
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
    </div>
  );
});

// 모달 폼 컴포넌트
const EventForm = memo(() => {
  console.log('EventForm 렌더링');
  return (
    <form>
      <div className='grid grid-cols-2 gap-4 mb-4'>
        <EventTitleInput />
        <EventContentInput />
        <StartDateTimeInput />
        <EndDateTimeInput />
      </div>
      <ModalFooter />
    </form>
  );
});

// 모달 컨텐츠 래퍼 컴포넌트
const ModalContent = memo(({ children }: { children: React.ReactNode }) => {
  console.log('ModalContent 렌더링');
  return (
    <AlertDialogContent className='max-w-[700px]'>
      {children}
    </AlertDialogContent>
  );
});

const EventModal = ({ open, onOpenChange }: EventModalProps) => {
  const reset = useEventModalStore((state) => state.reset);

  if (!open) {
    reset();
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader />
        <EventForm />
      </ModalContent>
    </AlertDialog>
  );
};

export default memo(EventModal);
