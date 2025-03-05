import { useFormContext } from "react-hook-form";
import { RequestBodyShipment } from "../../../../../services/shipments/addMultiple/type";
import CoreSelectCustomsAPI from "@/components/core-select-customs-API";
import { GetListCarrier } from "../../../../../services/carrier/getList";
import { ShippingMethod } from "../../../../../consts/enum";

const SelectCarrier = ({ className }: { className?: any }) => {
  const { control, watch } =
    useFormContext<RequestBodyShipment["POST_SINGLE"]>();
  const carrier = watch("carrier");
  return (
    <div className={className ?? ""}>
      <CoreSelectCustomsAPI
        control={control}
        name="carrier"
        //labelPath2="email"
        labelPath="code"
        fetchDataFn={GetListCarrier}
        params={{ page: 1, size: 10, sort: "asc" }}
        required
        rules={{ required: "This is required" }}
        label="Carrier"
        placeholder="Select carrier"
      />
      {carrier ? (
        <>
          <p>Carrier Info:</p>
          <p className="flex items-center">
            Logo: <img src={carrier.logo} className="w-[70px] h-[45px]" /> -
            &nbsp; Mã hãng vận chuyển: &nbsp;{carrier.code}
          </p>
          <p>
            Phương thức vận chuyển: &nbsp;
            {
              ShippingMethod.find((s) => s.value === carrier?.shippingMethod)
                ?.label
            }
          </p>
        </>
      ) : null}
    </div>
  );
};

export default SelectCarrier;
