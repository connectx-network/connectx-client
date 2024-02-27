import axios from "axios";
import { getToken, setToken } from "./token";
// import { refreshTokenRequest } from "@api/auth";
import { TOKEN_KEY } from "@constant/auth";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getToken(TOKEN_KEY.ACCESS);
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const statusCode = error.response ? error.response.status : null;
//     if (statusCode === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const token = await refreshTokenRequest();
//       setToken(TOKEN_KEY.ACCESS, token.accessToken);
//       setToken(TOKEN_KEY.REFRESH, token.refreshToken);
//       originalRequest.headers["Authorization"] = `Bearer ${token.accessToken}`;
//       return axiosInstance(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
