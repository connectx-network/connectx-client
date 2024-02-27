import { ROLE } from "@/constant";

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

export type VerifyOtpAccountBody = {
  email: string;
  verifyCode: string;
};

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
};
