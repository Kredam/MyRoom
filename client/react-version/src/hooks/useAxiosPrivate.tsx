import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useContext, useEffect } from 'react';
import AuthContext from './AuthProvider';
import { privateApi as api } from 'api/http-common';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = (): AxiosInstance => {
  const { auth } = useContext(AuthContext);
  const refresh = useRefreshToken();

  const requestInterceptor = (): any => {
    return api.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (config.headers !== undefined) {
          config.headers.Authorization = `Bearer ${auth.access}`;
        }
        return config;
      },
      async (error) => {
        return await Promise.reject(error);
      }
    );
  };

  const responseInterceptors = (): any => {
    return axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.data.message === 401) {
          return refresh();
        }
      }
    );
  };

  useEffect(() => {
    const request = requestInterceptor();
    const response = responseInterceptors();
    return () => {
      axios.interceptors.request.eject(request);
      axios.interceptors.response.eject(response);
    };
  }, [auth]);

  return api;
};

export default useAxiosPrivate;
