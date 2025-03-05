import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridReadyEvent,
  PaginationChangedEvent,
  GridApi,
  ClientSideRowModelModule,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

interface CustomDataGridProps<T> {
  loading: boolean;
  data: T[];
  totalElements: number;
  columnDefs: ColDef[];
  rowHeight?: number;
  pagination?: boolean;
  pageSize?: number;
  pageCurrent?: number;
  pageSizeOptions?: number[];
  className?: string;
  onChangePageSize?: (val: number) => void;
  onReset?: () => void;
  onChangePage?: (val: number) => void;
  loadingOverlayComponent?: React.FC;
  noRowsOverlayComponent?: React.FC;
  suppressPaginationPanel?: boolean;
  paginationComponent?: React.FC<PaginationProps>;
  rowSelection?: "single" | "multiple";
  onSelectionChanged?: (selectedRows: T[]) => void;
  onRowDoubleClicked?: (row: T) => void;
  onGridReady?: (params: GridReadyEvent) => void;
}

// Default Pagination Component
const DefaultPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalRecords,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <div className="flex justify-between p-3 border-t">
      <span>
        Page {currentPage} of {totalPages} | Total: {totalRecords}
      </span>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        {[5, 10, 25, 50, 100].map((size) => (
          <option key={size} value={size}>
            {size} rows
          </option>
        ))}
      </select>
    </div>
  );
};

const DefaultLoadingOverlay: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <span>Loading...</span>
  </div>
);

const DefaultNoRowsOverlay: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <p>No data available</p>
  </div>
);

function CustomDataGrid<T>({
  loading,
  data,
  columnDefs,
  totalElements,
  rowHeight = 50,
  pagination = true,
  pageSize,
  pageCurrent,
  onChangePageSize,
  onReset,
  onChangePage,
  pageSizeOptions = [5, 10, 25, 50, 100],
  className = "",
  loadingOverlayComponent: LoadingOverlay = DefaultLoadingOverlay,
  noRowsOverlayComponent: NoRowsOverlay = DefaultNoRowsOverlay,
  suppressPaginationPanel = true,
  paginationComponent: PaginationComponent = DefaultPagination,
  rowSelection,
  onSelectionChanged,
  onRowDoubleClicked,
  onGridReady,
}: CustomDataGridProps<T>) {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [currentPage, setCurrentPage] = useState(pageCurrent ?? 1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [totalPages, setTotalPages] = useState(1);

  const gridRef = React.useRef<AgGridReact>(null);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      editable: false,
      minWidth: 90,
      autoSize: true,
      wrapText: true,
      autoHeight: true,
    }),
    []
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setTotalPages(Math.ceil(totalElements / Number(currentPageSize ?? 1)));
    } else {
      setTotalPages(1);
    }
  }, [data, currentPageSize]);

  const handleGridReady = useCallback(
    (params: GridReadyEvent) => {
      setGridApi(params.api);
      if (onGridReady) {
        onGridReady(params);
      }
      if (pagination) {
        setTotalPages(Math.ceil(data.length / Number(currentPageSize ?? 1)));
      }
    },
    [data, onGridReady, pagination, currentPageSize]
  );

  const handlePageChange = (page: number) => {
    if (!gridApi || isNaN(page) || page < 1 || page > totalPages) return;
    gridApi.paginationGoToPage(page - 1);
    setCurrentPage(page);
    if (onChangePage) {
      onChangePage(page);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (gridApi) {
      setCurrentPageSize(newPageSize);

      if (onChangePageSize) {
        onChangePageSize(newPageSize);
      }
      // gridApi.paginationSetPageSize(newPageSize);
      setTotalPages(Math.ceil(totalElements / newPageSize));
    }
  };

  const handlePaginationChanged = useCallback(() => {
    if (gridApi) {
      const newPage = gridApi.paginationGetCurrentPage();
      setCurrentPage(newPage !== undefined ? newPage + 1 : 1);
    }
  }, [gridApi]);

  const handleSelectionChanged = useCallback(() => {
    if (gridApi && onSelectionChanged) {
      onSelectionChanged(gridApi.getSelectedRows());
    }
  }, [gridApi, onSelectionChanged]);

  const isRowSelectTable = (node) => {
    return true;
  };

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <div className="flex-grow h-full ag-theme-alpine">
        <AgGridReact
          loading={loading}
          modules={[ClientSideRowModelModule]}
          ref={gridRef}
          rowData={data}
          columnDefs={columnDefs}
          isRowSelectable={isRowSelectTable}
          defaultColDef={defaultColDef}
          rowHeight={rowHeight}
          pagination={pagination}
          paginationPageSize={currentPageSize}
          suppressPaginationPanel={suppressPaginationPanel}
          loadingOverlayComponent={LoadingOverlay}
          noRowsOverlayComponent={NoRowsOverlay}
          rowSelection={rowSelection}
          onGridReady={handleGridReady}
          onPaginationChanged={handlePaginationChanged}
          onSelectionChanged={handleSelectionChanged}
          //  onRowDoubleClicked={onRowDoubleClicked}
        />
      </div>
      {pagination && gridApi && (
        <PaginationComponent
          currentPage={pageCurrent ?? currentPage}
          totalPages={totalPages}
          pageSize={currentPageSize ?? 1}
          totalRecords={totalElements}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}

export default CustomDataGrid;
