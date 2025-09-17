import { create } from "zustand";
import { UserActivityItem } from "../types/user-dashboard";

interface SelectUserStore {
  selectedUser: UserActivityItem | null;
  setSelectedUser: (user: UserActivityItem | null) => void;
}

export const useSelectUserStore = create<SelectUserStore>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}))