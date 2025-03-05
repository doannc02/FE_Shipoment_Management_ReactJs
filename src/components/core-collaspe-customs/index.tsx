import { Box, Collapse, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ReactElement, ReactNode, useState } from "react";

type Props = {
  className?: string;
  title: ReactElement;
  children: ReactNode;
};

const CoreCollapseCustom = ({ title, children, className }: Props) => {
  const [open, setOpen] = useState(true);
  return (
    <Box className={className} display="flex" flexDirection="column">
      <Box
        className="w-full h-[45px] bg-[#F6F7FB] flex justify-between items-center cursor-pointer px-15"
        style={{
          borderTop: "1px solid #DFE0EB",
          borderBottom: "1px solid #DFE0EB",
        }}
        onClick={() => setOpen(!open)}
      >
        {title}
        <KeyboardArrowDownIcon
          fontSize="small"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        />
      </Box>

      <Collapse in={open}>{children}</Collapse>
    </Box>
  );
};

export default CoreCollapseCustom;
