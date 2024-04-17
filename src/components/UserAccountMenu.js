import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "./Authcontext";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

export default function UserAccountMenu({ handleLogOut }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { loggedMail } = useAuth();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip>
          <IconButton
            onClick={handleClick}
            size="larger"
            sx={{ ml: 120, mt: -9 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AccountCircleIcon
              color="primary"
              size="larger"
              variant="contained"
            />
          </IconButton>
        </Tooltip>
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
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            bgcolor: "#191e25;",
            color: "white",
            fontFamily: "serif",
            mt: 0.1,
            "& .MuiAvatar-root": {
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
              right: 20,
              width: 10,
              height: 20,
              bgcolor: "#191e25;",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/user-profile" style={{ textDecoration: "none" }}>
          <MenuItem id="signIn">My Account</MenuItem>
        </Link>
        <Link to="/watchlist" style={{ textDecoration: "none" }}>
          <MenuItem id="signIn">Watchlist</MenuItem>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <MenuItem id="signIn" onClick={handleLogOut}>
            Sign Out
          </MenuItem>
        </Link>
      </Menu>
    </React.Fragment>
  );
}
