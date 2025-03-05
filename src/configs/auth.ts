import { AxiosRequestConfig } from "axios";
import { URL_CUSTOMER, URL_SHIPMMENT } from "../consts/urls";
import { requestAuth } from "./axios";

export const shipmentAPI = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: URL_SHIPMMENT,
    ...options,
  });
};

export const customerAPI = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: URL_CUSTOMER,
    ...options,
  });
};
