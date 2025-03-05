import React from "react";
import CustomDataGrid from "../../components/grid-view-customs/GridView";
import useHomePage from "./useHomePage";
import PaginationCustom from "@/components/grid-view-customs/PaginationCustom";
import { useNavigate } from "react-router-dom";
import DiaConfirmDelShipment from "./components/DiaConfirmDelShipment";

const HomePage: React.FC = () => {
  const [values, handles] = useHomePage();

  const navigate = useNavigate();

  const {
    rowData,
    columns,
    isLoading,
    queryPage,
    totalElements,
    isShowDialogDel,
    shipmentId,
  } = values;

  const { onChangePageSize, onChangePage, setShowDialogDel, refetch } = handles;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Shipments Management</h1>

      <div className="p-3 mb-4 text-sm bg-blue-50 rounded-md">
        <button
          className="ml-4 px-2 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 cursor-pointer"
          onClick={() => {
            navigate("/add-new-shipment");
          }}
        >
          Thêm mới shipment
        </button>
      </div>

      <div className="h-[70vh]">
        <CustomDataGrid
          loading={isLoading}
          data={rowData}
          rowHeight={100}
          columnDefs={columns}
          rowSelection="multiple"
          pageSize={queryPage.size}
          pageCurrent={queryPage.page}
          totalElements={totalElements ?? 0}
          onChangePage={(val) => onChangePage(val)}
          onChangePageSize={(val) => onChangePageSize(val)}
          pageSizeOptions={[5, 10, 20]}
          paginationComponent={PaginationCustom}
        />
      </div>

      <DiaConfirmDelShipment
        shipmentId={shipmentId || ""}
        hideDialog={() => setShowDialogDel(false)}
        open={isShowDialogDel}
        refetch={refetch}
      />
    </div>
  );
};

export default HomePage;
