import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export interface MenuOption {
  actionType: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const ButtonCellRenderer = ({ options }: { options: MenuOption[] }) => {
  return (
    <Menu>
      <MenuHandler>
        <Button className="bg-slate-700 text-white px-4 py-2 rounded-md cursor-pointer">
          Menu
        </Button>
      </MenuHandler>
      <MenuList className="bg-slate-500 text-white w-70 shadow-lg rounded-md">
        {options.map((option, index) => {
          let hoverColor = "hover:bg-slate-600"; // Mặc định
          if (option.actionType === "VIEW") hoverColor = "hover:bg-blue-600";
          if (option.actionType === "DELETE") hoverColor = "hover:bg-red-600";

          return (
            <MenuItem
              key={index}
              className={`flex items-center gap-2 px-4 py-2 my-1 cursor-pointer ${hoverColor}`}
              onClick={option.onClick}
            >
              {option.icon && <span>{option.icon}</span>}
              <span>{option.label}</span>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default ButtonCellRenderer;
