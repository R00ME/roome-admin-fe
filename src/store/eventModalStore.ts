import { create } from 'zustand';

interface EventModalState {
  title: string;
  content: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setStartDate: (date: string) => void;
  setStartTime: (time: string) => void;
  setEndDate: (date: string) => void;
  setEndTime: (time: string) => void;
  reset: () => void;
}

const initialState = {
  title: '',
  content: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
};

export const useEventModalStore = create<EventModalState>((set) => ({
  ...initialState,

  setTitle: (title) => set({ title }),

  setContent: (content) => set({ content }),

  setStartDate: (startDate) =>
    set((state) => {
      if (state.endDate && state.endDate < startDate) {
        return {
          startDate,
          endDate: startDate,
          ...(state.endTime && state.endTime < state.startTime
            ? { endTime: state.startTime }
            : {}),
        };
      }
      return { startDate };
    }),

  setStartTime: (startTime) =>
    set((state) => {
      if (
        state.startDate === state.endDate &&
        state.endTime &&
        state.endTime < startTime
      ) {
        return { startTime, endTime: startTime };
      }
      return { startTime };
    }),

  setEndDate: (endDate) =>
    set((state) => {
      if (!state.startDate || endDate >= state.startDate) {
        return { endDate };
      }
      return {};
    }),

  setEndTime: (endTime) =>
    set((state) => {
      if (
        !state.startDate ||
        !state.startTime ||
        state.endDate > state.startDate ||
        (state.endDate === state.startDate && endTime >= state.startTime)
      ) {
        return { endTime };
      }
      return {};
    }),

  reset: () => set(initialState),
}));
