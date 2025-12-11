import instance from '.';
import { AppConfig } from '../constants/AppConfig';

export const loginAPI = (payload: any) => {
  console.log(payload);
  return instance.post(`${AppConfig.api_url}login`, payload);
};

export const registerAPI = (payload: any) => {
  console.log(payload);
  return instance.post(`${AppConfig.api_url}register`, payload);
};




