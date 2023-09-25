import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Logout from "@mui/icons-material/Logout";
import useUser from "../../hooks/useUser";

export default function AccountMenu({ handleOpenEdit, handleExit }) {
  const name = localStorage.getItem("name");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Stack direction="row" spacing={2}>
        <Avatar
          sx={{
            color: "#0E8750",
            bgcolor: "#DEDEE9",
            fontFamily: "Nunito",
            fontSize: "22px",
            fontWeight: "600",
          }}
          children={`${name.split(" ")[0][0].toUpperCase()}${
            name.split(" ")[1]
              ? name.split(" ")[1][0].toUpperCase()
              : name.split(" ")[0][1].toUpperCase()
          }
          `}
        />
      </Stack>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Typography
          sx={{
            color: "#0E8750",
            fontFamily: "Nunito",
            fontSize: "18px",
            fontWeight: "600",
            margin: "0px 8px 0px 16px",
          }}
        >
          {`${name.charAt(0).toUpperCase()}${name.substring(1)}`}
        </Typography>
        <IconButton onClick={handleClick} sx={{ padding: "0px" }}>
          <KeyboardArrowDownIcon sx={{ color: "#0E8750" }} />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            color: "#747488",
            fontFamily: "Nunito",
            fontSize: "8px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1,
            ml: 0.9,
            "& .MuiAvatar-root": {
              display: "flex",
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleOpenEdit}>
          <ListItemIcon>
            <DriveFileRenameOutlineIcon
              sx={{
                filter:
                  "invert(50%) sepia(6%) saturate(925%) hue-rotate(202deg) brightness(91%) contrast(89%)",
              }}
            />
          </ListItemIcon>
          Editar
        </MenuItem>
        <MenuItem onClick={handleExit}>
          <ListItemIcon>
            <Logout
              sx={{
                filter:
                  "invert(50%) sepia(6%) saturate(925%) hue-rotate(202deg) brightness(91%) contrast(89%)",
              }}
            />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
