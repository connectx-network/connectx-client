import { create } from "zustand";

interface OTPState {
  email: string;
  setEmail: (email: string) => void;
  resetEmail: () => void;
}

export const useOTPStore = create<OTPState>()((set) => ({
  email: "",
  setEmail: (email: string) => set({ email }),
  resetEmail: () => set({ email: "" }),
}));
