import axios from "axios";
import axiosInstance from "@utils/axios";
import {
  AuthToken,
  ResetPasswordBody,
  SignInBody,
  SignUpBody,
  VerifyOtpBody,
} from "@/types/auth";
import { getToken } from "@/utils";
import { TOKEN_KEY } from "@constant/auth";
import { User } from "@/types/user";

export const signupRequest = async (body: SignUpBody) => {
  const { data } = await axiosInstance.post("/auth/sign-up", body);
  return data;
};

export const verifyOtpAccountRequest = async (body: VerifyOtpBody) => {
  const { data } = await axiosInstance.post("/auth/verify-otp/account", body);
  return data;
};

export const resendOtpCodeRequest = async (email: string) => {
  await axiosInstance.post(`/auth/request/verify-code`, { email });
};

export const signinRequest = async (body: SignInBody): Promise<AuthToken> => {
  const { data } = await axiosInstance.post<AuthToken>("/auth/sign-in", body);
  return data;
};

export const resetPasswordRequest = async (email: string) => {
  await axiosInstance.post(`/auth/request/reset-password`, { email });
};

export const verifyOtpResetPasswordRequest = async (body: VerifyOtpBody) => {
  const { data } = await axiosInstance.post(
    "/auth/verify-otp/reset-password",
    body
  );
  return data;
};

export const changePasswordRequest = async (body: ResetPasswordBody) => {
  await axiosInstance.post(`/auth/reset-password`, body);
};

export const signinByGoogleRequest = async (
  idToken: string
): Promise<AuthToken> => {
  const { data } = await axiosInstance.post<AuthToken>("/auth/sign-in/google", {
    token: idToken,
  });
  return data;
};

export const getUserInfoRequest = async (): Promise<User> => {
  const { data } = await axiosInstance.get("/auth/self");
  return data;
};

// export const refreshTokenRequest = async () => {
//   const refreshToken = getToken(TOKEN_KEY.REFRESH);
//   const { data } = await axios.post<AuthToken>(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
//     "",
//     {
//       headers: {
//         Authorization: `Bearer ${refreshToken}`,
//       },
//     }
//   );
//   return data;
// };
