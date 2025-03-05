import { useFormContext } from "react-hook-form";
import { RequestBodyShipment } from "../../../../../services/shipments/addMultiple/type";
import CoreSelectCustomsAPI from "@/components/core-select-customs-API";
import { GetListCustomer } from "../../../../../services/customer/getList";

const SelectCustomer = ({ className }: { className?: any }) => {
  const { control, watch } =
    useFormContext<RequestBodyShipment["POST_SINGLE"]>();
  const customer = watch("customer");
  return (
    <div className={className ?? ""}>
      <CoreSelectCustomsAPI
        control={control}
        name="customer"
        labelPath2="email"
        labelPath="fullName"
        fetchDataFn={GetListCustomer}
        params={{ page: 1, size: 10, sort: "asc" }}
        required
        rules={{ required: "This is required" }}
        label="Ship from"
        placeholder="Select customer"
      />
      {customer ? (
        <>
          <p>Ship to</p>
          <p>
            {customer.fullName} - {customer.email}
          </p>
          <p>
            {customer?.phoneNumber} |{" "}
            {customer?.addresses && customer.addresses.length > 0 ? (
              <>
                {customer.addresses[0].address} -{" "}
                {customer.addresses[0].district} - {customer.addresses[0].ward}{" "}
                - {customer.addresses[0].city} - {customer.addresses[0].country}
              </>
            ) : (
              "No address available"
            )}
          </p>
        </>
      ) : null}
    </div>
  );
};

export default SelectCustomer;
