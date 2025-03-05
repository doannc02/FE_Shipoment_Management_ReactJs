import {
  RiHistoryFill,
  RiBankFill,
  RiDeleteBin6Line,
  RiFileCopyLine,
  RiDownloadCloud2Line,
  RiUploadCloud2Line,
  RiPrinterLine,
  RiFileEditLine,
  RiAddFill,
} from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export type ActionType =
  | "delete"
  | "watch"
  | "edit"
  | "append"
  | "remove"
  | "copy"
  | "export"
  | "import"
  | "history"
  | "view"
  | "print"
  | "draft"
  | "payment"
  | "accounting";

type Props = {
  actionList: ActionType[];
  isShowText?: boolean;
  onWatchAction?: (e?: any) => void;
  onDeleteAction?: (e?: any) => void;
  onEditAction?: (e?: any) => void;
  onAppendAction?: (e?: any) => void;
  onRemoveAction?: (e?: any) => void;
  onCopyAction?: (e?: any) => void;
  onImportAction?: (e?: any) => void;
  onExportAction?: (e?: any) => void;
  onHistoryAction?: (e?: any) => void;
  onViewAction?: (e?: any) => void;
  onPrintAction?: (e?: any) => void;
  onDraftAction?: (e?: any) => void;
  onPaymentAction?: (e?: any) => void;
  onAccounting?: (e?: any) => void;
};

export const CoreActionCustom = ({
  actionList,
  isShowText = true,
  onWatchAction,
  onDeleteAction,
  onEditAction,
  onAppendAction,
  onRemoveAction,
  onCopyAction,
  onHistoryAction,
  onViewAction,
  onPrintAction,
  onDraftAction,
  onExportAction,
  onImportAction,
  onPaymentAction,
  onAccounting,
}: Props) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex items-center gap-5">
      {actionList.includes("history") && (
        <div
          className="flex items-center cursor-pointer"
          onClick={onHistoryAction}
        >
          <IconButton>
            <RiHistoryFill size={20} />
          </IconButton>
          <Typography variant="body2">{t("btn.history")}</Typography>
        </div>
      )}

      {actionList.includes("payment") && (
        <div
          className="flex items-center cursor-pointer"
          onClick={onPaymentAction}
        >
          <IconButton>
            <RiBankFill size={20} />
          </IconButton>
          <Typography variant="body2">{t("btn.payment")}</Typography>
        </div>
      )}

      {actionList.includes("watch") && (
        <div
          className="flex items-center cursor-pointer"
          onClick={onWatchAction}
        >
          <IconButton>
            <FaRegEye size={20} />
          </IconButton>
          <Typography variant="body2">{t("detail")}</Typography>
        </div>
      )}
      {actionList.includes("append") && (
        <div
          className="flex items-center cursor-pointer"
          onClick={onAppendAction}
        >
          <IconButton>
            <RiAddFill size={20} />
          </IconButton>
          {isShowText && <Typography variant="body2">Thêm mới</Typography>}
        </div>
      )}

      {actionList.includes("delete") && (
        <div
          className="flex items-center cursor-pointer"
          onClick={onDeleteAction}
        >
          <IconButton>
            <RiDeleteBin6Line size={20} />
          </IconButton>
          {isShowText && <Typography variant="body2">Xóa</Typography>}
        </div>
      )}

      {actionList.includes("copy") && (
        <div
          className="flex items-center cursor-pointer"
          onClick={onCopyAction}
        >
          <IconButton>
            <RiFileCopyLine size={20} />
          </IconButton>
          <Typography variant="body2">Copy </Typography>
        </div>
      )}

      {actionList.includes("export") && (
        <div
          className="flex items-center cursor-pointer"
          onClick={onExportAction}
        >
          <IconButton>
            <RiDownloadCloud2Line size={20} />
          </IconButton>
          <Typography variant="body2">{t("btn.export")}</Typography>
        </div>
      )}

      {actionList.includes("import") && (
        <div
          className="flex items-center cursor-pointer"
          onClick={onImportAction}
        >
          <IconButton>
            <RiUploadCloud2Line size={20} />
          </IconButton>
          <Typography variant="body2">{t("btn.import")}</Typography>
        </div>
      )}

      {actionList.includes("print") && (
        <div
          className="flex items-center cursor-pointer"
          onClick={onPrintAction}
        >
          <IconButton>
            <RiPrinterLine size={20} />
          </IconButton>
          <Typography variant="body2">Print</Typography>
        </div>
      )}

      {actionList.includes("draft") && (
        <div
          className="flex items-center cursor-pointer"
          onClick={onDraftAction}
        >
          <IconButton>
            <RiFileEditLine size={20} />
          </IconButton>
          <Typography variant="body2">Đặt lại nháp</Typography>
        </div>
      )}
    </div>
  );
};
