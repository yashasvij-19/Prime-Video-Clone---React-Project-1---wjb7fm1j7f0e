import React from "react";
import "../styles/ComingSoon.css";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="comingSoon">
      <div className="comingSoon-logo">
        <img src="https://m.media-amazon.com/images/G/01/digital/video/web/Logo-min.png" />
        <p>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <i className="fa fa-arrow-left"></i>
            &nbsp;&nbsp;&nbsp;Back
          </Link>
        </p>
      </div>
      <div className="comingSoon-content">
        <h1>COMING SOON</h1>
        <h3>Stay tuned!</h3>
      </div>
    </div>
  );
};

export default ComingSoon;
