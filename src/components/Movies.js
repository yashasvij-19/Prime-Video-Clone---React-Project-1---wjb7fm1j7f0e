import React, { useState } from "react";
import "../styles/Movies.css";
import Navbar from "./Navbar";
import MovieSlider from "./MovieSlider";
import Carousel from "./Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Movies = () => {
  return (
    <div className="main-movies">
      <Navbar />
      <div className="movies">
        <Carousel />
      </div>
      <div className="theRows">
        <h2>
          <span>Prime</span> Recommended Movies
        </h2>
        <MovieSlider el={3} />
        <h2>
          <span>Prime</span> Latest Movies
        </h2>
        <MovieSlider el={6} />
        <h2>
          <span>Prime</span> Popular Shows
        </h2>
        <MovieSlider el={9} />
        <h2>
          <span>Prime</span> Amazon Specials
        </h2>
        <MovieSlider el={4} />
      </div>
    </div>
  );
};

export default Movies;
