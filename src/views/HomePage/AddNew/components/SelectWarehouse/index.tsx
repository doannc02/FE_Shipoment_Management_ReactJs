import CoreSelectCustomsAPI from "@/components/core-select-customs-API";
import { useFormContext } from "react-hook-form";
import { RequestBodyShipment } from "../../../../../services/shipments/addMultiple/type";
import { GetListWarehouse } from "../../../../../services/warehouse/getList";

const SelectWarehouse = ({ className }: { className?: any }) => {
  const { control, watch } =
    useFormContext<RequestBodyShipment["POST_SINGLE"]>();
  const warehouse = watch("warehouse");
  return (
    <div className={className ?? ""}>
      <CoreSelectCustomsAPI
        control={control}
        name="warehouse"
        fetchDataFn={GetListWarehouse}
        params={{ page: 1, size: 10, sort: "asc" }}
        required
        rules={{ required: "This is required" }}
        label="Ship from"
        placeholder="Select warehouse"
      />
      {warehouse ? (
        <>
          <p>Ship from</p>
          <p>
            {warehouse.name} - {warehouse.code}
          </p>
          <p>
            {warehouse?.phoneNumber} | {warehouse?.address} - {warehouse?.district}{" "}
            - {warehouse?.ward} - {warehouse?.city} - {warehouse?.country}
          </p>
        </>
      ) : null}
    </div>
  );
};

export default SelectWarehouse;
