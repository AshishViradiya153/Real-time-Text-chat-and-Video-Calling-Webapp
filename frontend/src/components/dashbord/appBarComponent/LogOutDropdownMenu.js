import React, { useState } from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { clearStoreThunk } from "../../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAudioOnly } from "../../../features/room/roomSlice";
const LogOutDropdownMenu = () => {
  const { audioOnly, localStream } = useSelector((store) => store.room);

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.target);
  };

  const handleAudioOnlyChange = () => {
    // dispatch.setAu(!audioOnly);
    dispatch(setAudioOnly(!audioOnly));
    handleMenuClose();
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        id="basic-button"
        onClick={handleMenuOpen}
        style={{ color: "#fff" }}
      >
        <MoreVertOutlinedIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            dispatch(clearStoreThunk("Logging out...👋"));
            handleMenuClose();
            // window.location.reload();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            color: "blueviolet",
            height: "35px",
            justifyContent: "center",
          }}
        >
          LogOut
        </MenuItem>
        {!localStream && (
          <MenuItem
            onClick={handleAudioOnlyChange}
            sx={{ alignItems: "center" }}
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              color: "blueviolet",
              height: "35px",
              justifyContent: "center",
            }}
          >
            {audioOnly ? "Audio Only Enabled" : "Audio Only Disabled"}
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default LogOutDropdownMenu;

// import * as React from "react";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// function LogOutDropdownMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     console.log(event.currentTarget);
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button id="basic-button" onClick={handleClick}>
//         Dashboard
//       </Button>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           "aria-labelledby": "basic-button",
//         }}
//       >
//         <MenuItem onClick={handleClose}>Logout</MenuItem>
//       </Menu>
//     </div>
//   );
// }
// export default LogOutDropdownMenu;
