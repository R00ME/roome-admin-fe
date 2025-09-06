export interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

interface AdminUser {
  adminId: number;
  adminEmail: string;
  username: string;
  adminRole: string;
  phoneNumber?: string | null;
}

interface UserStore {
  user: AdminUser | null;
  setUser: (user: AdminUser) => void;
  clearUser: () => void;
}
