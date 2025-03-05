import ButtonCellRenderer, {
  MenuOption,
} from "@/components/menu-button-customs";
import { ColDef } from "ag-grid-community";
import _ from "lodash";
import { useState } from "react";
import { CgTrash } from "react-icons/cg";
import { FaEdit, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShippingMethod } from "../../consts/enum";
import { useFormCustom } from "../../lib/form";
import { useQueryGetListShipment } from "../../services/shipments";
import { RequestParamsShipment } from "../../services/shipments/type";
import CopyableText from "./components/CopyValueText";

const defaultValues = {
  page: 1,
  size: 10,
  search: "",
  sort: "asc",
};

const useHomePage = () => {
  const navigate = useNavigate();

  const [isShowDialogDel, setShowDialogDel] = useState(false);
  const [shipmentId, setShipmentId] = useState("");

  const getMenuOptions = (shipmentId: string): MenuOption[] => [
    {
      actionType: "VIEW",
      label: "Xem chi tiết",
      icon: <FaEye />,
      onClick: () => {
        navigate(`/detail-shipment/${shipmentId}`);
      },
    },
    // {
    //   actionType: "EDIT",
    //   label: "Chỉnh sửa",
    //   icon: <FaEdit />,
    //   onClick: () => toast.success("Chỉnh sửa"),
    // },
    {
      actionType: "DELETE",
      label: "Xóa",
      icon: <CgTrash />,
      onClick: () => {
        setShowDialogDel(true);
        setShipmentId(shipmentId);
      },
    },
  ];

  const methodForm = useFormCustom<RequestParamsShipment["GET_LIST"]>({
    defaultValues: defaultValues,
  });
  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  );
  const onChangePageSize = (val: any) => {
    const input = { ...queryPage, size: val };
    setQueryPage(input);
  };

  const onChangePage = (val: any) => {
    const input = { ...queryPage, page: val };
    setQueryPage(input);
  };

  const onReset = () => {
    methodForm.reset(defaultValues);
    const input = _.omitBy(defaultValues, (v) => _.isNil(v));
    setQueryPage(input);
  };

  const onSubmit = methodForm.handleSubmit(async (input) => {
    setQueryPage(input);
  });

  const { data, isLoading, refetch } = useQueryGetListShipment({
    ...queryPage,
  });

  const columns: ColDef[] = [
    // {
    //   headerName: "ID",
    //   checkboxSelection: true,
    //   headerCheckboxSelection: true,
    // },
    {
      field: "id",
      headerName: "Shipment ID",
      cellRenderer: (params: any) => {
        return (
          <div className="flex flex-col align-middle justify-around gap-1">
            <span className="">{params.value.id}</span>
            <CopyableText
              value={params.value.shipmentNumber}
              onCopy={(copiedValue) => console.log("Đã sao chép:", copiedValue)}
            />

            <span className="">
              {new Date(params.value.createdAt).toLocaleString()}
            </span>
          </div>
        );
      },
    },
    {
      field: "warehouse",
      headerName: "Warehouse",
      cellRenderer: (params: any) => {
        console.log(params, "warehouse");
        return (
          <div className="flex flex-col justify-center items-center gap-1">
            <span>
              {params.value.name} - {params.value.address}
            </span>

            <span>
              {params?.value?.logo ? (
                <img
                  src={params.value.logo}
                  alt=""
                  className="max-h-[30px] max-w-[30px]"
                />
              ) : (
                params.value?.ward
              )}
              | {params.value?.country}
            </span>
          </div>
        );
      },
    },
    {
      field: "addressReceive",
      headerName: "Ship to",
      cellRenderer: (params: any) => {
        return (
          <div className="flex flex-col justify-center items-center gap-1">
            <span>
              Địa chỉ: {params.value.country} - {params.value.district}
            </span>
            <span>
              {params.value.ward} - {params.value.address}
            </span>
            {params.value.phone ? (
              <span>Phone: {params.value.phone}</span>
            ) : null}
          </div>
        );
      },
    },
    {
      field: "totalPackage",
      headerName: "Package",
      maxWidth: 110,
      cellRenderer: (params: any) => {
        console.log(params, "paramsTT");
        return (
          <span className="min-w-[60px] align-middle text-center">
            {params.value ?? ""}
          </span>
        );
      },
    },
    {
      field: "infoPackage",
      headerName: "Weight",
      maxWidth: 150,
      cellRenderer: (params: any) => {
        return (
          <div className="flex flex-col justify-center items-center gap-1">
            <span className="min-w-[60px] align-middle ">
              Weight:{" "}
              {params.value.reduce((acc: any, item: any) => {
                return acc + item.weight;
              }, 0)}
            </span>
            <span className="min-w-[60px] align-middle text-center">
              Width:{" "}
              {params.value.reduce((acc: any, item: any) => {
                return acc + item.width;
              }, 0)}
            </span>
            <span className="min-w-[60px] align-middle text-center">
              Height:{" "}
              {params.value.reduce((acc: any, item: any) => {
                return acc + item.height;
              }, 0)}
            </span>
          </div>
        );
      },
    },
    {
      field: "carrier",
      headerName: "Forwarding",
      cellRenderer: (params: any) => {
        return (
          <div className="flex flex-col justify-center items-center gap-1">
            <span className="min-w-[60px] align-middle text-center">
              Mã công ty: {params.value.code}
            </span>
            <img
              src={params.value.logo}
              alt=""
              className="max-h-[50px] max-w-[60px]"
            />
            <span className="min-w-[60px] align-middle text-center">
              Phương thức vận chuyển:{" "}
              {
                ShippingMethod.find(
                  (i) => i.value === params.value.shippingMethod
                )?.label
              }
            </span>
          </div>
        );
      },
    },
    {
      field: "button",
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <ButtonCellRenderer options={getMenuOptions(params.data.id.id)} />
      ),
    },
  ];

  const rowData = (data?.data.content ?? []).map((item) => ({
    id: {
      id: item.id,
      shipmentNumber: item.shipmentNumber,
      createdAt: item.createAt,
    },
    warehouse: item.warehouse,
    addressReceive: item.addressReceive,
    totalPackage: (item.packages ?? []).length,
    infoPackage: item.packages,
    carrier: item.carrier,
  }));

  return [
    {
      columns,
      rowData,
      isLoading,
      queryPage,
      totalElements: data?.data.totalElements,
      isShowDialogDel,
      shipmentId,
    },
    {
      onChangePageSize,
      onChangePage,
      onSubmit,
      onReset,
      setShowDialogDel,
      refetch,
    },
  ] as const;
};

export default useHomePage;
