import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./Authcontext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MenuHome({ title, opt, optTwo, optThree }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [IsLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  const { loggedMail } = useAuth();

  useEffect(() => {
    const userDataString = localStorage.getItem(loggedMail);
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData.token) {
        setIsLoggedin(true);
      }
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "#aaa", fontSize: "1rem" }}
      >
        {title}
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
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <MenuItem onClick={handleClose}>{opt}</MenuItem>
        </Link>

        {IsLoggedin ? (
          <Link to="/movies" style={{ textDecoration: "none", color: "white" }}>
            {" "}
            <MenuItem onClick={handleClose}>{optTwo}</MenuItem>
          </Link>
        ) : (
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <MenuItem onClick={handleClose}>{optTwo}</MenuItem>
          </Link>
        )}

        <Link
          to="/comingSoon"
          style={{ textDecoration: "none", color: "white" }}
        >
          <MenuItem onClick={handleClose}>{optThree}</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
