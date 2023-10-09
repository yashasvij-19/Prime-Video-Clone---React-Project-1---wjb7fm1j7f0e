import React from "react";
import "../styles/Navbar.css";
import AccountMenu from "./AccountMenu";
import MenuHome from "./MenuHome";
import MenuCat from "./MenuCat";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
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

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
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
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInput}
                placeholder="Search..."
              />
              <IconButton
                aria-label="search"
                color="primary"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </li>
          </ul>
          {IsLoggedin ? <UserAccountMenu /> : <AccountMenu />}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
