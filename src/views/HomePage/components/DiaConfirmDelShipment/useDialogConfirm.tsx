import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteShipment } from "../../../../services/shipments";

const useDialogConfirm = ({
  shipmentId,
  refetch,
  hideDialog,
}: {
  shipmentId: string;
  refetch: any;
  hideDialog: () => void;
}) => {
  const { mutate } = useMutation(deleteShipment, {
    onError: () => {
      toast.error("Có lỗi xảy ra!");
    },
    onSuccess: (data) => {
      if (data.data.data.id) {
        refetch();
        toast.success("Xóa thành công!");
        hideDialog();
      }
    },
  });

  const onSubmit = () => {
    mutate({ id: shipmentId });
  };

  return [{ onSubmit }] as const;
};

export default useDialogConfirm;
