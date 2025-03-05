import { BaseResponse, PageResponse } from "../type";

export interface ShipmentDetail {
  id: string;
  shipmentNumber: string;
  customer: Customer;
  note: any;
  status: string;
  totalAmount: number;
  weight: number;
  createAt: string;
  addressSender: AddressSender;
  addressReceive: AddressReceive;
  packages: Package[];
  carrier: Carrier;
  warehouse: {
    id: string;
    name: string;
  };
}

export interface Customer {
  id: string;
  name: any;
}

export interface AddressSender {
  id: string;
  shipmentId: string;
  name: string;
  prefixPhone: any;
  phoneNumber: any;
  code: any;
  phone: any;
  city: string;
  district: string;
  ward: string;
  postCode: any;
  address: string;
  type: string;
  createAt: string;
}

export interface AddressReceive {
  id: string;
  shipmentId: string;
  name: string;
  prefixPhone: any;
  phoneNumber: any;
  code: any;
  phone: any;
  city: string;
  district: string;
  ward: string;
  postCode: any;
  address: string;
  type: string;
  createAt: string;
}

export interface Package {
  customerId: string;
  warehouseId: string;
  addressSender: AddressSenderPackage;
  addressReceive: AddressReceivePackage;
  id: string;
  warehouse?: {
    id: string;
    name: string;
  };
  packageNumber: string;
  note: string;
  status: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  product: Product[];
}

export interface PackageProduct {
  packageId: string;
  productName: string;
  productId: string;
  origin: string;
  originPrice: number;
  quantity: number;
  total: number;
  unit: "Item" | "Set";
  productLink: string;
  tax: number;
}

export interface Product {
  code: string;
  imageUrl: string;
  price: number;
  isHasVariant: boolean;
  name: string;
  sku: string;
  description: string;
  metaTitle: string;
  brand: string;
  category: string;
  attributes: Attribute[];
  variants: Variant[];
}

export interface Attribute {
  name: string;
  values: string[];
}

export interface Variant {
  id: string;
  sku: string;
  price: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  stockQty: number;
  attributeValues: AttributeValues;
  imageUrls: string[];
}

export interface AttributeValues {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export interface AddressSenderPackage {
  id: string;
  packageId: string;
  name: string;
  prefixPhone: any;
  phoneNumber: any;
  code: any;
  phone: string;
  city: string;
  district: string;
  ward: string;
  postCode: string;
  status: string;
  address: string;
  type: string;
  updatedBy: any;
  updatedAt: string;
  country: any;
  latitude: any;
  longitude: any;
  deliveryInstructions: any;
  isDefault: boolean;
  sensitiveDataFlag: boolean;
  estimatedDeliveryDate: any;
  deliveryDate: any;
  searchIndex: string;
}

export interface AddressReceivePackage {
  id: string;
  packageId: string;
  name: string;
  prefixPhone: any;
  phoneNumber: any;
  code: any;
  phone: string;
  city: string;
  district: string;
  ward: string;
  postCode: any;
  status: string;
  address: string;
  type: string;
  updatedBy: any;
  updatedAt: string;
  country: any;
  latitude: any;
  longitude: any;
  deliveryInstructions: any;
  isDefault: boolean;
  sensitiveDataFlag: boolean;
  estimatedDeliveryDate: any;
  deliveryDate: any;
  searchIndex: string;
}

export interface Carrier {
  id: string;
  code: string;
  lastmile_tracking: any;
  logo: string;
  shippingMethod: string;
  type: string;
}

export type RequestParamsShipment = {
  GET_DETAIL: { ShipmentId: string };
  GET_LIST: {
    page: number;
    size: number;
    sort: string;
    search: string;
  };
};

export type ResponseShipment = {
  GET_DETAIL: BaseResponse<ShipmentDetail>;
  GET_LIST: PageResponse<ShipmentDetail[]>;
};
