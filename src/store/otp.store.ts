import { create } from "zustand";

interface OTPState {
  email: string;
  otpCode: string;
  isResetPassword: boolean;
  setEmail: (email: string) => void;
  setOtpCode: (otp: string) => void;
  setIsResetPassword: (isResetPassword: boolean) => void;
  resetOtpStore: () => void;
}

export const useOTPStore = create<OTPState>()((set) => ({
  email: "",
  otpCode: "",
  isResetPassword: false,
  setEmail: (email: string) => set({ email }),
  setOtpCode: (otpCode: string) => set({ otpCode }),
  setIsResetPassword: (isResetPassword: boolean) => set({ isResetPassword }),
  resetOtpStore: () => set({ email: "", otpCode: "", isResetPassword: false }),
}));
