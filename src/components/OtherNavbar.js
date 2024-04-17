import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import AccountMenu from "./AccountMenu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import "../styles/OtherNavbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import UserAccountMenu from "./UserAccountMenu";
import { Link } from "react-router-dom";
import { useAuth } from "./Authcontext";
import { Accordion } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "black",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  justifyContent: "flex-end",
}));

export default function OtherNavbar() {
  const [IsLoggedin, setIsLoggedin] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(true); // State to control search visibility

  const navigate = useNavigate();
  const { loggedMail } = useAuth();

  React.useEffect(() => {
    const userDataString = localStorage.getItem(loggedMail);
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData.token) {
        setIsLoggedin(true);
      }
    }
  }, []);

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      navigate(`/search-results/${searchInput}`);
    }
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    setShowSearch(false); // Hide search when drawer opens
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setShowSearch(true); // Show search when drawer closes
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography>
            <img
              src="https://m.media-amazon.com/images/G/01/digital/video/web/Logo-min.png"
              style={{ width: "100px" }}
            />
          </Typography>
          {showSearch && ( // Render search only if showSearch is true
            <Typography className="searchList">
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
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "black",
            color: "white",
            transition: "background 0.5s, color 0.5s",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <ListItem style={{ textAlign: "center" }}>
              <ListItemButton>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <ListItem style={{ textAlign: "center" }}>
              <ListItemButton>
                <ListItemText primary={"Store"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to="/comingSoon"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem style={{ textAlign: "center" }}>
              <ListItemButton>
                <ListItemText primary={"LiveTV"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to="/comingSoon"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem style={{ textAlign: "center" }}>
              <ListItemButton>
                <ListItemText primary={"Categories"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <ListItem style={{ textAlign: "center" }}>
              <ListItemButton>
                <ListItemText primary={"Account"} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
