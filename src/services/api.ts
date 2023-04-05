import { AppError } from "@utils/AppError";
import axios, { AxiosInstance } from "axios";

type SignOut = () => void;

type ApiInstanceProps = AxiosInstance & {
  registerInterceptorTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: process.env.APP_API_URL,
}) as ApiInstanceProps;

api.registerInterceptorTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message));
      }

      return Promise.reject(error);
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
