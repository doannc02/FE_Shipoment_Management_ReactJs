import { CoreActionCustom } from "@/components/core-action-customs";
import { CoreTable } from "@/components/core-table-customs";
import useProductPackageRow from "./useProductPackageRow";
import CoreInputCustoms from "@/components/core-input-customs";
import CoreSelectCustoms from "@/components/core-select-customs";

const ProductPackageRow = ({ indexPackage }: { indexPackage: number }) => {
  const [values, handles] = useProductPackageRow(indexPackage);
  const { columns, rows, control, ShipmentId } = values;
  const { handleAddRow, setValue } = handles;
  console.log(rows, "======rows======", rows);
  return (
    <div className="my-2">
      <div className="flex justify-around">
        <CoreInputCustoms
          control={control}
          label="Weight"
          name={`packages.${indexPackage}.weight`}
          InputProps={{
            endAdornment: (
              <>
                <CoreSelectCustoms
                  options={[
                    {
                      value: "Kg",
                      label: "kg",
                    },
                    {
                      value: "g",
                      label: "G",
                    },
                  ]}
                  control={control}
                  name={`packages.${indexPackage}.weightUnit`}
                  label=""
                  placeholder="Chọn đơn vị"
                  onChangeValue={(val) => {
                    if (val) {
                      setValue(`weightUnit`, val);
                    }
                  }}
                />
              </>
            ),
          }}
        />
        <CoreInputCustoms
          control={control}
          label="width"
          name={`packages.${indexPackage}.length`}
          InputProps={{
            endAdornment: (
              <>
                <CoreSelectCustoms
                  options={[
                    {
                      value: "M",
                      label: "M",
                    },
                    {
                      value: "Cm",
                      label: "Cm",
                    },
                  ]}
                  control={control}
                  name={`packages.${indexPackage}.cubitUnit`}
                  label=""
                  placeholder="Chọn đơn vị"
                  onChangeValue={(val) => {
                    if (val) {
                      setValue(`cubitUnit`, val);
                    }
                  }}
                />
              </>
            ),
          }}
        />
        <CoreInputCustoms
          control={control}
          label="width"
          name={`packages.${indexPackage}.width`}
          InputProps={{
            endAdornment: (
              <>
                <CoreSelectCustoms
                  options={[
                    {
                      value: "M",
                      label: "M",
                    },
                    {
                      value: "Cm",
                      label: "Cm",
                    },
                  ]}
                  control={control}
                  name={`packages.${indexPackage}.cubitUnit`}
                  label=""
                  placeholder="Chọn đơn vị"
                  onChangeValue={(val) => {
                    if (val) {
                      setValue(`cubitUnit`, val);
                    }
                  }}
                />
              </>
            ),
          }}
        />
        <CoreInputCustoms
          control={control}
          label="width"
          name={`packages.${indexPackage}.height`}
          InputProps={{
            endAdornment: (
              <>
                <CoreSelectCustoms
                  options={[
                    {
                      value: "M",
                      label: "M",
                    },
                    {
                      value: "Cm",
                      label: "Cm",
                    },
                  ]}
                  control={control}
                  name={`packages.${indexPackage}.cubitUnit`}
                  label=""
                  placeholder="Chọn đơn vị"
                  onChangeValue={(val) => {
                    if (val) {
                      setValue(`cubitUnit`, val);
                    }
                  }}
                />
              </>
            ),
          }}
        />
      </div>
      <CoreTable className="ml-10 mt-5" columns={columns} data={rows} />
      {!ShipmentId ? (
        <CoreActionCustom
          actionList={["append"]}
          onAppendAction={() => {
            handleAddRow();
          }}
        />
      ) : null}
    </div>
  );
};

export default ProductPackageRow;
