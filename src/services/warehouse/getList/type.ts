import { BaseResponse, PageResponse } from "../../type";

export interface Warehouse {
    id: string
    logo: string
    name: string
    prefixPhone: string
    phoneNumber: string
    code: string
    phone: string
    city: string
    district: string
    ward: string
    postCode: string
    address: string
    createAt: string
    createBy: string
    country: string
    latitude: number
    longitude: number
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

export type ResponseWarehouse = {
  GET_DETAIL: BaseResponse<Warehouse>;
  GET_LIST: PageResponse<Warehouse[]>;
};
