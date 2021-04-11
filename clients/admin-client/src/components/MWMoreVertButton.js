import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default function MWMoreVertButton({ moveHandler, deleteHandler }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const options = [
    {
      name: "Move Up",
      cb: (e) => {
        e.stopPropagation();
        handleClose(e);
        moveHandler && moveHandler("up");
      },
    },
    {
      name: "Delete",
      cb: (e) => {
        e.stopPropagation();
        handleClose(e);
        deleteHandler && deleteHandler("up");
      },
    },
    {
      name: "Move Down",
      cb: (e) => {
        e.stopPropagation();
        handleClose(e);
        moveHandler && moveHandler("down");
      },
    },
  ];

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {options.map((option, i) => (
          <MenuItem key={i} onClick={option.cb}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
