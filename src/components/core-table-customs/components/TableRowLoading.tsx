import { TableCell, TableRow } from "@mui/material";

type Props = {
  colSpan: number;
};

export const TableRowLoading = ({ colSpan }: Props) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} variant="body">
        <div className="flex justify-center min-h-[60px]">
          <>Loading....</>
        </div>
      </TableCell>
    </TableRow>
  );
};
