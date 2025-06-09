import { create } from 'zustand';

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
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setDateTime: (
    type: 'start' | 'end',
    field: keyof DateTime,
    value: string,
  ) => void;
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
  reset: () => set(initialState),
}));
