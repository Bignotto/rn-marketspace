import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/storageAuth";
import { AppError } from "@utils/AppError";
import axios, { AxiosError, AxiosInstance } from "axios";

type SignOut = () => void;

type ApiInstanceProps = AxiosInstance & {
  registerInterceptorTokenManager: (signOut: SignOut) => () => void;
};

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

const api = axios.create({
  baseURL: process.env.APP_API_URL,
}) as ApiInstanceProps;

let requestQueue: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptorTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      console.log(requestError);
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          const { refresh_token } = await storageAuthTokenGet();
          console.log("token token token", refresh_token);
          if (!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequest = requestError.config;
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              requestQueue.push({
                onSuccess: (token: string) => {
                  originalRequest.headers = {
                    Authorization: `Bearer ${token}`,
                  };
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }
          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("/sessions/refresh-token", {
                refresh_token,
              });

              console.log({ data });

              await storageAuthTokenSave({
                refresh_token: data.refresh_token,
                token: data.token,
              });

              if (originalRequest.data) {
                originalRequest.data = JSON.parse(originalRequest.data);
              }

              originalRequest.headers = {
                Authorization: `Bearer ${data.token}`,
              };
              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`;

              requestQueue.forEach((req) => {
                req.onSuccess(data.token);
              });

              console.log("Token REFRESHED!");

              resolve(api(originalRequest));
            } catch (error: any) {
              requestQueue.forEach((req) => {
                req.onFailure(error);
              });

              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              requestQueue = [];
            }
          });
        }
        signOut();
      }

      console.log(requestError);

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      }

      return Promise.reject(requestError);
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
