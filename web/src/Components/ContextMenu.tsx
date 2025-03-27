import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Employee } from "../Store/types";
import OptionsIcon from "../Assets/option.png";
import { store } from "../Store/employees";
import CreateEditDialog from "./CreateEditDialog";
import { observer } from "mobx-react";

const _ContextMenu: React.FC<{ employee: Employee }> = ({ employee }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {store.employeeRequestUpdate !== null && (
        <CreateEditDialog employee={employee} />
      )}
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img src={OptionsIcon} width={20} alt="Options Icon" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            store.employeeRequestUpdate = employee;
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => store.deleteEmployee(employee)}
          style={{ background: "tomato", color: "white", fontWeight: "bold" }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

const ContextMenu = observer(_ContextMenu);
export default ContextMenu;
