import { BaseResponse } from "../../type/index";

export interface MultiShipment {
  shipments: Shipment[];
}

export interface Shipment {
  warehouse?: any;
  customer?: any;
  carrier?: any;
  warehouseId: string;
  customerId: string;
  note: string;
  status: string;
  carrierId: string;
  cubitUnit: string;
  weightUnit: string;
  packages: Package[];
}

export interface Package {
  note: string;
  status: string;
  length: number;
  width: number;
  height: number;
  amount: number;
  weight: number;
  cubitUnit: string;
  weightUnit: string;
  createBy: string;
  packageProducts: PackageProduct[];
}

export interface PackageProduct {
  productName: string;
  origin: string;
  originPrice: number;
  quantity: number;
  total: number;
  unit: string;
  productLink: string;
  tax: number;
}

export type RequestBodyShipment = {
  POST_MULTI: MultiShipment;
  POST_SINGLE: Shipment;
};

export type ResponseMultiShipment = {
  POST_MULTI: BaseResponse<
    {
      id: string;
    }[]
  >;
  POST_SINGLE: BaseResponse<{
    id: string;
  }>;
};
