import { useQuery } from "@tanstack/react-query";
import { shipmentAPI } from "../../../configs/auth";
import { defaultOption } from "../../../configs/reactQuery";
import { RequestParamsWarehouse, ResponseWarehouse, Warehouse } from "./type";
import { PageResponse } from "../../../services/type";

export const GetDetailShipment = async (
  params: RequestParamsWarehouse["GET_DETAIL"]
): Promise<ResponseWarehouse["GET_DETAIL"]> => {
  const { data } = await shipmentAPI({
    method: "get",
    url: "/api/warehouse/detail",
    params,
  });
  return data;
};

export const useQueryGetShipmentDetail = (
  params: RequestParamsWarehouse["GET_DETAIL"],
  options?: any
) => {
  return useQuery(
    ["/api/warehouse/detail", params],
    () => GetDetailShipment(params),
    {
      ...defaultOption,
      ...options,
    }
  );
};

export const GetListWarehouse = async (
  params?: RequestParamsWarehouse["GET_LIST"]
): Promise<PageResponse<Warehouse[]>> => {
  const { data } = await shipmentAPI({
    method: "get",
    url: "/api/warehouse/list",
    params,
  });
  return data;
};

export const useQueryGetListShipment = (
  params: RequestParamsWarehouse["GET_LIST"],
  options?: any
) => {
  return useQuery<ResponseWarehouse["GET_LIST"]>(
    ["/api/warehouse/list", params],
    () => GetListWarehouse(params),
    {
      ...defaultOption,
      ...options,
    }
  );
};
