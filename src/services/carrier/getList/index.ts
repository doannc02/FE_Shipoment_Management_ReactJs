import { useQuery } from "@tanstack/react-query";
import { shipmentAPI } from "../../../configs/auth";
import { defaultOption } from "../../../configs/reactQuery";
import { RequestParamsWarehouse, ResponseCarrier } from "./type";
import { PageResponse } from "../../../services/type";

export const GetListCarrier = async (
  params?: any
): Promise<PageResponse<any[]>> => {
  const { data } = await shipmentAPI({
    method: "get",
    url: "/api/carrirer/list",
    params,
  });
  return data;
};

export const useQueryGetListShipment = (
  params: RequestParamsWarehouse["GET_LIST"],
  options?: any
) => {
  return useQuery<ResponseCarrier["GET_LIST"]>(
    ["/api/carrier/list", params],
    () => GetListCarrier(params),
    {
      ...defaultOption,
      ...options,
    }
  );
};
