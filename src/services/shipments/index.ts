import { useQuery } from "@tanstack/react-query";
import { shipmentAPI } from "../../configs/auth";
import { defaultOption } from "../../configs/reactQuery";
import { RequestParamsShipment, ResponseShipment } from "./type";
import { RequestBodyShipment } from "./addMultiple/type";

export const GetDetailShipment = async (
  params: RequestParamsShipment["GET_DETAIL"]
): Promise<ResponseShipment["GET_DETAIL"]> => {
  const { data } = await shipmentAPI({
    method: "get",
    url: "/v1/api/shipment",
    params,
  });
  return data;
};

export const useQueryGetShipmentDetail = (
  params: RequestParamsShipment["GET_DETAIL"],
  options?: any
) => {
  return useQuery(
    ["/v1/api/shipment", params],
    () => GetDetailShipment(params),
    {
      ...defaultOption,
      ...options,
    }
  );
};

export const GetListShipment = async (
  params: RequestParamsShipment["GET_LIST"]
): Promise<ResponseShipment["GET_LIST"]> => {
  const { data } = await shipmentAPI({
    method: "get",
    url: "/v1/api/shipment/list",
    params,
  });
  return data;
};

export const useQueryGetListShipment = (
  params: RequestParamsShipment["GET_LIST"],
  options?: any
) => {
  return useQuery<ResponseShipment["GET_LIST"]>(
    ["/v1/api/shipment/list", params],
    () => GetListShipment(params),
    {
      ...defaultOption,
      ...options,
    }
  );
};

//--method Add new Shipment

export const postShipment = async (
  requestBody: RequestBodyShipment["POST_SINGLE"]
): Promise<any> => {
  return await shipmentAPI({
    method: "post",
    url: "/v1/api/shipment/create",
    data: requestBody,
  });
};

// method delete
export const deleteShipment = async ({ id }: { id: string }): Promise<any> => {
  return await shipmentAPI({
    method: "delete",
    url: `/v1/api/shipment/${id}`,
    data: {
      id: id,
    },
  });
};
