import { create } from "zustand";
import { AuthState } from "../types/auth";

export const useAuthStore = create<AuthState>(set => ({
  accessToken: null,
  setAccessToken: (token) => set({accessToken: token}),
  clearAccessToken: () => set({accessToken: null})
}))