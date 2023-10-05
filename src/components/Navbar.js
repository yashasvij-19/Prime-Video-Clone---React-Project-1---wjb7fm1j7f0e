import React from "react";
import "../styles/Navbar.css";
import AccountMenu from "./AccountMenu";
import MenuHome from "./MenuHome";
import MenuCat from "./MenuCat";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserAccountMenu from "./UserAccountMenu";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./Authcontext";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [IsLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      navigate(`/search-results/${searchInput}`);
    }
  };
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

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "35ch",
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <div className="navbar-main">
      <div className="navbar-links">
        <div id="logo-div">
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src="https://m.media-amazon.com/images/G/01/digital/video/web/Logo-min.png"
              alt="prime-video-logo"
              className="prime-video-logo"
            />
          </Link>
        </div>
        <div className="nav-list">
          <ul>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li>
                <MenuHome
                  title={"Home"}
                  opt={"All"}
                  optTwo={"Movies"}
                  optThree={"TV Shows"}
                />
              </li>
            </Link>
            {IsLoggedin ? (
              <Link to="/movies" style={{ textDecoration: "none" }}>
                <li>
                  <MenuHome
                    title={"Store"}
                    opt={"All"}
                    optTwo={"Rent"}
                    optThree={"Channels"}
                  />
                </li>
              </Link>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <li>
                  <MenuHome
                    title={"Store"}
                    opt={"All"}
                    optTwo={"Rent"}
                    optThree={"Channels"}
                  />
                </li>
              </Link>
            )}
            <li className="noOption">LiveTV</li>
            <li>
              <MenuCat />
            </li>
            <li id="searchList">
              {" "}
              <Search>
                <StyledInputBase
                  placeholder="Search…"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    console.log(e.target.value);
                  }}
                />
                <IconButton
                  aria-label="search"
                  color="primary"
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              </Search>
            </li>
          </ul>
          {IsLoggedin ? <UserAccountMenu /> : <AccountMenu />}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
