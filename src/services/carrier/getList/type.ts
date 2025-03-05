import { BaseResponse, PageResponse } from "../../type";

export interface OOOO {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: any;
}

export interface Address {
  id: string;
  customerId: string;
  fullName: any;
  city: string;
  district: string;
  ward: string;
  address: string;
  isDefaultAddress: boolean;
  country: any;
  latitude: any;
  longitude: any;
}

export type RequestParamsWarehouse = {
  GET_DETAIL: { ShipmentId: string };
  GET_LIST: {
    page: number;
    size: number;
    sort: string;
    search: string;
  };
};

export type ResponseCarrier = {
  GET_DETAIL: BaseResponse<any>;
  GET_LIST: PageResponse<any[]>;
};
