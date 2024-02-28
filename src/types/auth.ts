import { ROLE } from "@/constant";
import { User } from "./user";

export type SignUpBody = {
  fullName: string;
  email: string;
  password: string;
  userRole: ROLE;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type VerifyOtpBody = {
  email: string;
  verifyCode: string;
};

export type ResetPasswordBody = {
  email: string;
  password: string;
  otp: string;
};

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
