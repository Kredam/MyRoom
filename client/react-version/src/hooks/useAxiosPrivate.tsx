import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useContext, useEffect } from 'react';
import AuthContext from './AuthProvider';
import { privateApi as api } from 'utils/http-common';

const useAxiosPrivate = (): AxiosInstance => {
  const { auth } = useContext(AuthContext);

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

  // const responseInterceptors = () => {
  //   return axios.interceptors.response.use((response) => response, (error) => {

  //   });
  // };

  useEffect(() => {
    const request = requestInterceptor();
    // const response = responseInterceptors();
    return () => {
      axios.interceptors.request.eject(request);
      // axios.interceptors.response.eject(response);
    };
  }, [auth]);

  return api;
};

export default useAxiosPrivate;
