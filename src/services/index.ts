import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { store } from '../store';
import { ToastMessage } from '../constants/TostMessages';
import { setResetUser } from '../store/slice/authSlice';

const instance = axios.create({});

instance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token && config.headers) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    if (config.data instanceof FormData) {
      if (config.headers) config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      if (config.headers) config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error: any) => Promise.reject(error),
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // logBox({
    //   url: response.config.url,
    //   payload: response.config.data,
    //   resBody: response.data,
    //   method: response.config.method,
    // });
    return response;
  },
  (error: AxiosError) => {
         const { response, message } = error;
    if (axios.isAxiosError(error)) {
      // logBox({
      //   url: error.config?.url,
      //    method: error.config?.method,
      //   payload: error.config?.data,
      //   errorStatus: error.response?.status,
      //   errorBody: error.response?.data,
      // });
    } else {
      // logBox({
      //   url: 'Unknown',
      //   errorBody: error?.toString(),
      // });
    }
    if (response?.status === 401) {
      store.dispatch(setResetUser());
      ToastMessage.Custom('error', 'Session expired. Logging out...');
    }
    if (message === 'Network Error') {
      ToastMessage.Custom('error', 'Network error occurred. Please check your internet.');
    }
    return Promise.reject(error);
  },
);

export default instance;
