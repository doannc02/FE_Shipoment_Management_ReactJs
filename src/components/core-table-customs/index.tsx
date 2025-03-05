import styled from "@emotion/styled";
import {
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import _ from "lodash";

import { ReactElement, ReactNode } from "react";

import { TableRowLoading } from "./components/TableRowLoading";
import { TableRowEmpty } from "./components/TableRowEmpty";
import { CellContent } from "./components/CellContent";

export type ColumnProps = {
  header: ReactNode | string;
  fieldName: string;
  render?: (val: any, index: number) => ReactNode;
  styleCell?: TableCellProps;
  columnCell?: TableCellProps;
};

export type PaginationTableProps = {
  page?: number;
  size?: number;
};

export type CoreTableProps = {
  refTableContainer?: any;
  tableName?: string;
  className?: string;
  data: Record<string, any>[];
  columns: ColumnProps[];
  page?: number;
  size?: number;
  totalPages?: number;
  paginationHidden?: boolean;
  isLoading?: boolean;
  isShowColumnStt?: boolean;
  stickyHeader?: boolean;
  maxHeight?: number;
  isShowNoDataText?: boolean;
  actionTable?: null | ReactElement;
  tableHead?: null | ReactElement;
  onChangePageSize?: (val: PaginationTableProps) => void;
  onRowClick?: (id: number, row?: any) => void;
};

export const TableHeadCommon = styled(TableHead)(
  ({ layout = "Layout1" }: { layout?: "Layout1" | "Layout2" }) => ({
    backgroundColor: "white",
    ...(layout === "Layout1" ? {} : { borderBottom: "2px solid #A7A7A7" }),
  })
);

export const TableContainerCommon = styled(TableContainer)(
  ({ layout = "Layout1" }: { layout?: "Layout1" | "Layout2" }) => ({
    boxShadow: "none!important",
    borderRadius: layout === "Layout1" ? "4px 4px 0px 0px" : "10px",
    ...(layout === "Layout1" ? { border: "1px solid #DFE0EB" } : {}),
  })
);

export const CoreTable = ({
  className,
  tableName,
  data,
  columns,
  page = 0,
  size = 20,
  totalPages,
  paginationHidden,
  isLoading,
  isShowColumnStt = false,
  maxHeight,
  isShowNoDataText = true,
  actionTable,
  stickyHeader = false,
  tableHead,
  onChangePageSize,
  onRowClick,
}: CoreTableProps) => {
  const dataColumn = isShowColumnStt
    ? [
        {
          header: "No",
          fieldName: "index",
        },
        ...columns,
      ]
    : columns;

  if (isShowColumnStt) {
    data = data.map((item: any, index: number) => {
      const noNumber = page * size + index + 1;
      return {
        ...item,
        index: noNumber > 9 ? noNumber : `0${noNumber}`,
      };
    });
  }

  const columnsChecked = dataColumn;

  return (
    <div className={className} style={{ position: "relative" }}>
      <TableContainerCommon
        style={{
          maxHeight: `${maxHeight}px`,
        }}
      >
        <Table
          aria-label="sticky table"
          stickyHeader={stickyHeader}
          sx={{ minWidth: 650 }}
        >
          {tableHead || (
            <TableHeadCommon>
              <TableRow>
                {_.map(columnsChecked, (column, index) => (
                  <TableCell
                    variant="head"
                    key={index}
                    {...(column?.styleCell ?? {})}
                    style={{
                      paddingTop: "1rem",
                      paddingBottom: "1rem",
                      minWidth: index !== 0 ? 200 : 60,
                      fontWeight: 600,
                      backgroundColor: "#f0f3f7",
                      ...column?.styleCell?.style,
                    }}
                  >
                    {column?.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeadCommon>
          )}

          <TableBody>
            {isLoading && <TableRowLoading colSpan={columnsChecked.length} />}

            {!isLoading && data?.length === 0 && (
              <TableRowEmpty
                colSpan={columnsChecked.length}
                isShowNoDataText={isShowNoDataText}
              />
            )}

            {!isLoading &&
              _.map(data, (row: any, index) => (
                <TableRow
                  key={row?.key || row?.id || index}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                    "&:hover": { backgroundColor: "#b2e4f9" },
                  }}
                  onClick={() => {
                    onRowClick && onRowClick(row?.id, row);
                  }}
                >
                  {_.map(columnsChecked, (column, indexColumn) => {
                    return (
                      <TableCell
                        {...(column?.columnCell ?? {})}
                        key={indexColumn}
                        style={{
                          borderBottom:
                            index !== data.length - 1
                              ? "1px solid rgba(224, 224, 224, 1)"
                              : "",
                        }}
                      >
                        <CellContent
                          row={row}
                          render={column?.render}
                          fieldName={column?.fieldName}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}

            {actionTable}
          </TableBody>
        </Table>
      </TableContainerCommon>
    </div>
  );
};
