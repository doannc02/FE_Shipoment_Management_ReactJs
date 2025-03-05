import { useQuery } from "@tanstack/react-query";
import { customerAPI } from "../../../configs/auth";
import { defaultOption } from "../../../configs/reactQuery";
import { RequestParamsWarehouse, ResponseWarehouse, Customer } from "./type";
import { PageResponse } from "../../../services/type";

export const GetDetailShipment = async (
  params: RequestParamsWarehouse["GET_DETAIL"]
): Promise<ResponseWarehouse["GET_DETAIL"]> => {
  const { data } = await customerAPI({
    method: "get",
    url: "/api/customer/detail",
    params,
  });
  return data;
};

export const useQueryGetShipmentDetail = (
  params: RequestParamsWarehouse["GET_DETAIL"],
  options?: any
) => {
  return useQuery(
    ["/api/customer/detail", params],
    () => GetDetailShipment(params),
    {
      ...defaultOption,
      ...options,
    }
  );
};

export const GetListCustomer = async (
  params?: any
): Promise<PageResponse<Customer[]>> => {
  const { data } = await customerAPI({
    method: "get",
    url: "/list",
    params,
  });
  return data;
};

export const useQueryGetListShipment = (
  params: RequestParamsWarehouse["GET_LIST"],
  options?: any
) => {
  return useQuery<ResponseWarehouse["GET_LIST"]>(
    ["/list", params],
    () => GetListCustomer(params),
    {
      ...defaultOption,
      ...options,
    }
  );
};
