import { TableCell, TableRow, Typography } from "@mui/material";

type Props = {
  colSpan: number;
  isShowNoDataText: boolean;
};

export const TableRowEmpty = (props: Props) => {
  const { colSpan, isShowNoDataText } = props;

  if (!isShowNoDataText) return null;

  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        variant="body"
        align="center"
        className="py-8"
      >
        <div className="flex justify-center min-h-[60px] flex-col">
          <>Không có dữ liệu</>
          <Typography variant="body2">......</Typography>
        </div>
      </TableCell>
    </TableRow>
  );
};
