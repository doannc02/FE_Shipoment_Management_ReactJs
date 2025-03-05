import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon, Info as InfoIcon } from "@mui/icons-material";
import useDialogConfirm from "./useDialogConfirm";

const DiaConfirmDelShipment = ({
  open,
  hideDialog,
  shipmentId,
  refetch,
}: {
  hideDialog: () => void;
  open: boolean;
  shipmentId: string;
  refetch: any;
}) => {
  const [handles] = useDialogConfirm({ shipmentId, refetch, hideDialog });
  const { onSubmit } = handles;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Dialog open={open} onClose={hideDialog}>
        <DialogTitle className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-lg font-semibold">
            <InfoIcon className="text-blue-500" /> Dialog Title
          </span>
          <IconButton onClick={hideDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="p-4">
          <p className="text-gray-700">
            Bạn có chắc chắn muốn xóa Shipmnet ${shipmentId} này không?.
          </p>
        </DialogContent>

        <DialogActions>
          <Button onClick={onSubmit} color="warning" variant="contained">
            Xác nhận
          </Button>
          <Button onClick={hideDialog} color="primary" variant="contained">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DiaConfirmDelShipment;
