import { useFieldArray } from "react-hook-form";
import { useFormCustom } from "../../../lib/form";
import { RequestBodyShipment } from "../../../services/shipments/addMultiple/type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  postShipment,
  useQueryGetShipmentDetail,
} from "../../../services/shipments";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const defaultPackages = {
  note: "",
  length: 0,
  width: 0,
  height: 0,
  amount: 0,
  weight: 0,
  status: "Created",
  cubitUnit: "",
  weightUnit: "",
  packageProducts: [
    {
      productName: "",
      origin: "",
      originPrice: 0,
      quantity: 0,
      total: 0,
      unit: "",
      productLink: "",
      tax: 0,
    },
  ],
};

const defaultValues = {
  warehouseId: "",
  customerId: "",
  note: "",
  status: "ShipmentCreated",
  carrierId: "",
  cubitUnit: "",
  weightUnit: "",
  packages: [defaultPackages],
} as any;

const useAddNew = () => {
  const methodForm = useFormCustom<RequestBodyShipment["POST_SINGLE"]>({
    defaultValues,
  });

  const { ShipmentId } = useParams();

  const { handleSubmit, control, setValue, getValues, reset } = methodForm;

  const navigate = useNavigate()

  const { append, remove, fields } = useFieldArray({
    control,
    name: `packages`,
  });
  const { data, isLoading, refetch } = useQueryGetShipmentDetail({
    ShipmentId: String(ShipmentId),
  });
  const { mutate } = useMutation(postShipment, {
    onSuccess: (data) => {
      if (data?.status) {
        console.log(data, 'log data')
        toast.success("Thêm mới shipment thành công!");
        navigate(`/detail-shipment/${data?.data?.data.id}`);
      } else {
        toast.error(data?.data?.message);
      }
      refetch();
    },
    onError: (error) => {
      toast.error("Có lỗi xảy ra");
    },
  });

  useEffect(() => {
    if (ShipmentId) {
      console.log(ShipmentId, data?.data, 'log')
      reset({
        ...data?.data,
        warehouseId: data?.data?.warehouse.id,
        customerId: data?.data?.customer.id,
        carrierId: data?.data?.carrier.id,
      });
    }
  }, [ShipmentId, data?.data]);

  console.log(getValues("warehouse"), "warehouse");
  const onSubmit = handleSubmit(async (data) => {
    mutate({
      ...data,
      warehouseId: data.warehouse.id,
      customerId: data.customer.id,
      carrierId: data.carrier.id,
    });
  });

  return [
    { methodForm, fields, defaultPackages, isLoading, ShipmentId },
    { onSubmit, setValue, append, remove, getValues, handleSubmit },
  ] as const;
};

export default useAddNew;
