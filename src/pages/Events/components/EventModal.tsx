import { AlertDialog } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { memo } from 'react';
import { useEventModalStore } from '@/store/eventModalStore';
import { ModalHeader, ModalFooter, ModalContent } from '@/components/modal';
import { Label, TextareaWithCount, DateTimeInput } from '@/components/form';

// 이벤트 제목 입력 컴포넌트
const EventTitleInput = memo(() => {
  const title = useEventModalStore((state) => state.title);
  const setTitle = useEventModalStore((state) => state.setTitle);

  return (
    <div>
      <Label>이벤트명</Label>
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
  const content = useEventModalStore((state) => state.content);
  const setContent = useEventModalStore((state) => state.setContent);

  return (
    <div className='col-span-1 row-span-2'>
      <Label>이벤트 내용</Label>
      <TextareaWithCount
        name='content'
        placeholder='유저의 알림창으로 보낼 메시지를 입력하세요'
        maxLength={20}
        className='h-[80px]'
        value={content}
        showCount
        onChange={(e) => {
          if (e.target.value.length <= 20) {
            setContent(e.target.value);
          }
        }}
      />
    </div>
  );
});

// 날짜/시간 입력 컴포넌트
const StartDateTimeInput = memo(() => {
  const start = useEventModalStore((state) => state.dateTime.start);
  const setDateTime = useEventModalStore((state) => state.setDateTime);

  return (
    <DateTimeInput
      label='이벤트 시작일'
      date={start.date}
      time={start.time}
      onDateChange={(date) => setDateTime('start', 'date', date)}
      onTimeChange={(time) => setDateTime('start', 'time', time)}
    />
  );
});

const EndDateTimeInput = memo(() => {
  const end = useEventModalStore((state) => state.dateTime.end);
  const startDate = useEventModalStore((state) => state.dateTime.start.date);
  const setDateTime = useEventModalStore((state) => state.setDateTime);

  return (
    <DateTimeInput
      label='이벤트 종료일'
      date={end.date}
      time={end.time}
      minDate={startDate}
      onDateChange={(date) => setDateTime('end', 'date', date)}
      onTimeChange={(time) => setDateTime('end', 'time', time)}
    />
  );
});

// 모달 폼 컴포넌트
const EventForm = memo(() => {
  return (
    <form>
      <div className='grid grid-cols-2 gap-4 mb-4'>
        <EventTitleInput />
        <EventContentInput />
        <StartDateTimeInput />
        <EndDateTimeInput />
      </div>
      <ModalFooter
        cancelText='닫기'
        confirmText='등록하기'
      />
    </form>
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
        <ModalHeader title='이벤트 등록' />
        <EventForm />
      </ModalContent>
    </AlertDialog>
  );
};

export default memo(EventModal);
