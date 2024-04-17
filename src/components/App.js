import React from "react";
import LandingPage from "./LandingPage";
import Movies from "./Movies";
import Login from "./Login";
import Register from "./Register";
import Navbar from "./Navbar";
import Userprofile from "./Userprofile";
import ContentDetails from "./ContentDetails";
import MovieSlider from "./MovieSlider";
import Watchlist from "./Watchlist";
import SearchResults from "./SearchResults";
import OtherNavbar from "./OtherNavbar";
import ComingSoon from "./ComingSoon";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Authcontext";

const App = () => {
  return (
    <Router>
      <div id="main">
        <AuthProvider>
          <Routes>
            <Route
              path="/search-results/:theInput"
              element={<SearchResults />}
            />
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/content-details" element={<ContentDetails />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/user-profile" element={<Userprofile />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/comingSoon" element={<ComingSoon />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
};

export default App;
