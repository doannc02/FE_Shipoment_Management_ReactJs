import { CoreActionCustom } from "@/components/core-action-customs";
import CoreInputCustoms from "@/components/core-input-customs";
import CoreSelectCustoms from "@/components/core-select-customs";
import { ColumnProps } from "@/components/core-table-customs";
import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { RequestBodyShipment } from "../../../../../services/shipments/addMultiple/type";

const useProductPackageRow = (indexPackage: number) => {
  const { control, setValue, getValues } =
    useFormContext<RequestBodyShipment["POST_SINGLE"]>();
  const { ShipmentId } = useParams();
  const { fields, append, remove } = useFieldArray({
    name: `packages.${indexPackage}.packageProducts`,
    control,
    keyName: "key",
  });

  const handleAddRow = () => {
    console.log("add row");
    append({
      productLink: "",
      productName: "",
      quantity: 0,
      originPrice: 0,
      total: 0,
      tax: 0,
    } as any);
  };

  const columns = useMemo(
    () =>
      [
        {
          header: "IMG",
          fieldName: "productLink",
          styleCell: {
            style: {
              minWidth: 250,
            },
          },
        },
        {
          header: (
            <>
              Product <span style={{ color: "red" }}>*</span>
            </>
          ),
          fieldName: "productName",
        },
        {
          header: "Origin",
          fieldName: "origin",
        },
        {
          header: (
            <>
              Price <span style={{ color: "red" }}>* </span> (VNĐ)
            </>
          ),
          fieldName: "originPrice",
        },
        {
          header: (
            <>
              Unit <span style={{ color: "red" }}>*</span>
            </>
          ),
          fieldName: "unit",
        },
        {
          header: (
            <>
              Quantity <span style={{ color: "red" }}>*</span>
            </>
          ),
          fieldName: "quantity",
        },
        {
          header: "Tax (%)",
          fieldName: "tax",
        },
        {
          header: "Total (USD)",
          fieldName: "total",
        },
        ...(!ShipmentId
          ? [
              {
                header: "Action",
                fieldName: "action",
              },
            ]
          : []),
      ] as ColumnProps[],
    []
  );

  const rows = (fields ?? []).map((item, index) => {
    return {
      ...item,
      productLink: (
        <div>
          {!ShipmentId ? (
            <CoreInputCustoms
              control={control}
              key={item.key}
              placeholder="Nhập product link"
              name={`packages.${indexPackage}.packageProducts.${index}.productLink`}
            />
          ) : null}
          {getValues(
            `packages.${indexPackage}.packageProducts.${index}.productLink`
          ) && !!ShipmentId ? (
            <img
              src={getValues(
                `packages.${indexPackage}.packageProducts.${index}.productLink`
              )}
              className="h-[50px] w-[50px]"
            />
          ) : null}
        </div>
      ),
      unit: (
        <CoreSelectCustoms
          control={control}
          options={[
            {
              value: "Item",
              label: "Item",
            },
            {
              value: "Set",
              label: "Set",
            },
          ]}
          placeholder="Chọn đơn vị"
          name={`packages.${indexPackage}.packageProducts.${index}.unit`}
          required
          rules={{
            required: "không được bỏ trống trường này!",
          }}
        />
      ),
      total: (
        <CoreInputCustoms
          type="number"
          control={control}
          name={`packages.${indexPackage}.packageProducts.${index}.total`}
          isViewProp
          required
          rules={{
            required: "không được bỏ trống trường này!",
          }}
        />
      ),
      origin: (
        <CoreInputCustoms
          control={control}
          placeholder="Nhập origin"
          name={`packages.${indexPackage}.packageProducts.${index}.origin`}
          required
          rules={{
            required: "không được bỏ trống trường này!",
          }}
        />
      ),
      originPrice: (
        <CoreInputCustoms
          type="number"
          control={control}
          required
          rules={{
            required: "không được bỏ trống trường này!",
          }}
          placeholder="Nhập price"
          name={`packages.${indexPackage}.packageProducts.${index}.originPrice`}
          onChangeValue={(val) => {
            const quantity = getValues(
              `packages.${indexPackage}.packageProducts.${index}.quantity`
            );
            const taxRate = getValues(
              `packages.${indexPackage}.packageProducts.${index}.tax`
            );
            if (val && quantity > 0) {
              const taxAmount = (val * quantity * taxRate) / 100;
              const total = val * quantity + taxAmount;
              setValue(
                `packages.${indexPackage}.packageProducts.${index}.total`,
                total
              );
            }
          }}
        />
      ),
      quantity: (
        <CoreInputCustoms
          type="number"
          control={control}
          placeholder="Nhập số lượng"
          name={`packages.${indexPackage}.packageProducts.${index}.quantity`}
          onChangeValue={(val) => {
            const originPrice = getValues(
              `packages.${indexPackage}.packageProducts.${index}.originPrice`
            );
            const taxRate = getValues(
              `packages.${indexPackage}.packageProducts.${index}.tax`
            );
            if (val && originPrice > 0) {
              const taxAmount = (val * originPrice * taxRate) / 100;
              const total = val * originPrice + taxAmount;
              setValue(
                `packages.${indexPackage}.packageProducts.${index}.total`,
                total
              );
            }
          }}
          required
          rules={{
            required: "không được bỏ trống trường này!",
          }}
        />
      ),
      productName: (
        <CoreInputCustoms
          control={control}
          placeholder="Nhập tên sản phẩm"
          name={`packages.${indexPackage}.packageProducts.${index}.productName`}
          required
          rules={{
            required: "không được bỏ trống trường này!",
          }}
        />
      ),
      tax: (
        <CoreInputCustoms
          type="number"
          placeholder="Nhập thuế"
          name={`packages.${indexPackage}.packageProducts.${index}.tax`}
          control={control}
          key={item.key}
          onChangeValue={(val) => {
            const originPrice = getValues(
              `packages.${indexPackage}.packageProducts.${index}.originPrice`
            );
            const quantity = getValues(
              `packages.${indexPackage}.packageProducts.${index}.quantity`
            );
            if (val && originPrice > 0 && quantity > 0) {
              const taxAmount = (quantity * originPrice * val) / 100;
              const total = quantity * originPrice + taxAmount;
              setValue(
                `packages.${indexPackage}.packageProducts.${index}.total`,
                total
              );
            }
          }}
        />
      ),
      action: (
        <CoreActionCustom
          actionList={!ShipmentId ? ["delete"] : []}
          onDeleteAction={() => {
            remove(index);
          }}
        />
      ),
    };
  });

  return [
    { columns, rows, control, ShipmentId },
    { handleAddRow, setValue },
  ] as const;
};

export default useProductPackageRow;
