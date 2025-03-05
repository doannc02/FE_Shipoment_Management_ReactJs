import { CoreActionCustom } from "@/components/core-action-customs";
import CoreCollapseCustom from "@/components/core-collaspe-customs";
import CoreInputCustoms from "@/components/core-input-customs";
import { Box } from "@mui/material";
import { FormProvider } from "react-hook-form";
import ProductPackageRow from "./components/ProductPackageRow";
import SelectCarrier from "./components/SelectCarrier";
import SelectCustomer from "./components/SelectCustomer";
import SelectWarehouse from "./components/SelectWarehouse";
import useAddNew from "./useAddNew";

const AddNewShipment = () => {
  const [values, handles] = useAddNew();
  const { methodForm, fields, defaultPackages, isLoading, ShipmentId } = values;
  const { control } = methodForm;
  const { onSubmit, append, remove } = handles;

  return (
    <FormProvider {...methodForm}>
      {isLoading ? (
        <>Loading....</>
      ) : (
        <form onSubmit={onSubmit} className="">
          {!ShipmentId ? (
            <h3>Thêm mới Shipment</h3>
          ) : (
            <h3>Chi tiết Shipment</h3>
          )}
          <div className="flex justify-between">
            <SelectWarehouse className="w-[48%]" />
            <SelectCustomer className="w-[48%]" />
          </div>
          <div className="mt-10 flex justify-between">
            <SelectCarrier className="w-[48%]" />
            <CoreInputCustoms
              className="w-[48%]"
              control={control}
              label="Ghi chú shipment"
              placeholder="Nhập ghi chú cho shipment"
              name="note"
              multiline
            />
          </div>

          {!ShipmentId ? (
            <button
              className="my-10 p-5  cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                append(defaultPackages as any);
              }}
            >
              + Thêm mới package
            </button>
          ) : null}
          <p>List Package ({fields.length})</p>
          <div>
            {(fields ?? []).map((item, index) => {
              return (
                <CoreCollapseCustom
                  className="my-5"
                  key={item.id}
                  title={
                    <div className="flex w-full justify-between">
                      <p>Package {index + 1}</p>

                      {!ShipmentId ? (
                        <Box className="flex items-center pr-4 mr-2">
                          <CoreActionCustom
                            actionList={["delete", "copy"]}
                            onDeleteAction={(e) => {
                              e.preventDefault();
                              remove(index);
                            }}
                          />
                        </Box>
                      ) : null}
                    </div>
                  }
                >
                  <ProductPackageRow indexPackage={index} />
                </CoreCollapseCustom>
              );
            })}
          </div>

          {!ShipmentId ? (
            <div className="flex justify-center mt-20">
              <button type="submit" className="bg-green-300 p-5 cursor-pointer">
                Thêm mới Shipment
              </button>
            </div>
          ) : null}
        </form>
      )}
    </FormProvider>
  );
};
export default AddNewShipment;
