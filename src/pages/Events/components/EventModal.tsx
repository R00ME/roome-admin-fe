import { AlertDialog } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { memo, useState } from 'react';
import { useEventModalStore } from '@/store/eventModalStore';
import { ModalHeader, ModalFooter, ModalContent } from '@/components/modal';
import { Label, TextareaWithCount, DateTimeInput } from '@/components/form';
import {
  EventReceiverTarget,
  EventModalProps,
  CreateEventRequest,
} from '@/types/events';
import { createEvent } from '@/apis/events';
import { useToast } from '@/hooks/useToast';

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

// 공지 발송 시각 입력 컴포넌트
const UploadDateTimeInput = memo(() => {
  const uploadTime = useEventModalStore((state) => state.uploadTime);
  const setUploadTime = useEventModalStore((state) => state.setUploadTime);

  return (
    <DateTimeInput
      label='공지 발송 시각'
      date={uploadTime.date}
      time={uploadTime.time}
      onDateChange={(date) => setUploadTime('date', date)}
      onTimeChange={(time) => setUploadTime('time', time)}
    />
  );
});

// 알림 대상 선택 컴포넌트
const ReceiverTargetInput = memo(() => {
  const receiverTarget = useEventModalStore((state) => state.receiverTarget);
  const setReceiverTarget = useEventModalStore(
    (state) => state.setReceiverTarget,
  );

  return (
    <div>
      <Label>알림 대상</Label>
      <RadioGroup
        value={receiverTarget}
        onValueChange={(value) =>
          setReceiverTarget(value as EventReceiverTarget)
        }
        className='flex flex-row gap-6 mt-2'>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='ALL'
            id='all'
          />
          <label
            htmlFor='all'
            className='cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            전체
          </label>
        </div>
      </RadioGroup>
    </div>
  );
});

// 모달 폼 컴포넌트
const EventForm = memo(
  ({ onClose, onSuccess }: { onClose: () => void; onSuccess?: () => void }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { success, error } = useToast();

    // 스토어에서 모든 값 가져오기
    const title = useEventModalStore((state) => state.title);
    const content = useEventModalStore((state) => state.content);
    const startDateTime = useEventModalStore((state) => state.dateTime.start);
    const endDateTime = useEventModalStore((state) => state.dateTime.end);
    const uploadTime = useEventModalStore((state) => state.uploadTime);
    const receiverTarget = useEventModalStore((state) => state.receiverTarget);
    const reset = useEventModalStore((state) => state.reset);

    const handleSubmit = async () => {
      // 필수 필드 검증
      if (!title.trim()) {
        error('이벤트명을 입력해주세요.');
        return;
      }

      if (!content.trim()) {
        error('이벤트 내용을 입력해주세요.');
        return;
      }

      if (!startDateTime.date || !startDateTime.time) {
        error('이벤트 시작일을 입력해주세요.');
        return;
      }

      if (!endDateTime.date || !endDateTime.time) {
        error('이벤트 종료일을 입력해주세요.');
        return;
      }

      if (!uploadTime.date || !uploadTime.time) {
        error('공지 발송 시각을 입력해주세요.');
        return;
      }

      try {
        setIsLoading(true);

        // 날짜/시간을 ISO 형식으로 변환
        const startDate = `${startDateTime.date}T${startDateTime.time}:00`;
        const endDate = `${endDateTime.date}T${endDateTime.time}:00`;
        const uploadDateTime = `${uploadTime.date}T${uploadTime.time}:00`;

        const eventData: CreateEventRequest = {
          eventTitle: title,
          eventContent: content,
          startDate,
          endDate,
          eventUploadTime: uploadDateTime,
          eventReceiverTarget: receiverTarget,
        };

        await createEvent(eventData);

        success('이벤트가 성공적으로 등록되었습니다.');

        reset();
        onClose();
        onSuccess?.();
      } catch (err) {
        console.error('이벤트 등록 실패:', err);
        error('이벤트 등록에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <form>
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <EventTitleInput />
          <StartDateTimeInput />
          <EventContentInput />
          <EndDateTimeInput />
          <UploadDateTimeInput />
          <div className='max-md:hidden'></div>
          <ReceiverTargetInput />
        </div>
        <ModalFooter
          cancelText='닫기'
          confirmText='등록하기'
          onCancel={onClose}
          onConfirm={handleSubmit}
          confirmDisabled={isLoading}
        />
      </form>
    );
  },
);

const EventModal = ({
  open,
  onOpenChange,
  onSuccess,
}: EventModalProps & { onSuccess?: () => void }) => {
  const reset = useEventModalStore((state) => state.reset);

  if (!open) {
    reset();
  }

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader title='이벤트 등록' />
        <EventForm
          onClose={handleClose}
          onSuccess={onSuccess}
        />
      </ModalContent>
    </AlertDialog>
  );
};

export default memo(EventModal);
