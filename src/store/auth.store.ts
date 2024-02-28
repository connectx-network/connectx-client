import { create } from "zustand";
import { User } from "@/types/user";

export type AuthType = {
  isAuthenticated: boolean;
  user: User | null;
};

type AuthState = {
  auth: AuthType;
  setAuth: (param: AuthType) => void;
};

const initialAuth: AuthType = {
  isAuthenticated: false,
  user: null,
};

export const useAuthStore = create<AuthState>()((set) => ({
  auth: initialAuth,
  setAuth: (auth) => set({ auth }),
}));
