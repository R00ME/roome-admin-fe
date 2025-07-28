import { create } from "zustand";

interface AdminUser {
  adminEmail: string;
  username: string;
  phoneNumber?: string | null;
};

interface UserStore {
  user: AdminUser | null;
  setUser: (user: AdminUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));