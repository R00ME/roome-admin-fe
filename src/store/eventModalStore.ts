import { create } from 'zustand';
import { EventReceiverTarget } from '@/types/events';

interface DateTime {
  date: string;
  time: string;
}

interface EventModalState {
  title: string;
  content: string;
  dateTime: {
    start: DateTime;
    end: DateTime;
  };
  uploadTime: DateTime;
  receiverTarget: EventReceiverTarget;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setDateTime: (
    type: 'start' | 'end',
    field: keyof DateTime,
    value: string,
  ) => void;
  setUploadTime: (field: keyof DateTime, value: string) => void;
  setReceiverTarget: (target: EventReceiverTarget) => void;
  reset: () => void;
}

const initialState = {
  title: '',
  content: '',
  dateTime: {
    start: {
      date: '',
      time: '',
    },
    end: {
      date: '',
      time: '',
    },
  },
  uploadTime: {
    date: '',
    time: '',
  },
  receiverTarget: 'ALL' as EventReceiverTarget,
};

export const useEventModalStore = create<EventModalState>((set) => ({
  ...initialState,
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setDateTime: (type, field, value) =>
    set((state) => ({
      dateTime: {
        ...state.dateTime,
        [type]: {
          ...state.dateTime[type],
          [field]: value,
        },
      },
    })),
  setUploadTime: (field, value) =>
    set((state) => ({
      uploadTime: {
        ...state.uploadTime,
        [field]: value,
      },
    })),
  setReceiverTarget: (target) => set({ receiverTarget: target }),
  reset: () => set(initialState),
}));
