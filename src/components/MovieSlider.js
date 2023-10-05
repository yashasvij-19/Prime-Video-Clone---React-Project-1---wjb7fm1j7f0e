import React, { useEffect, useState } from "react";
import "../styles/MovieSlider.css";
import { Button } from "@mui/material";

const MovieSlider = ({ el }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(el);
  const [totalPages, setTotalPages] = useState(100);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const YOUR_JWT_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGRhMTgyZGJlZGNmNGY2MDIzODY0MiIsImlhdCI6MTY5NTM5MjEzMCwiZXhwIjoxNzI2OTI4MTMwfQ.fX3zhW6Z89wFzSa5IZgeS62Lcsa-2P8nOCsbrKVukUk";
  const PROJECT_ID = "f104bi07c490";

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/ott/show?page=${page}&limit=100`,
          {
            headers: { projectId: "f104bi07c490" },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const shows = data.data;

        setMovies(shows);
        setTotalPages(10);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(currentPage);
  }, [currentPage]);

  const prevSlide = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const nextSlide = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
  };

  const toggleWatchlist = (movie) => {
    if (watchlist.includes(movie.id)) {
      setWatchlist(watchlist.filter((id) => id !== movie.id));
    } else {
      setWatchlist([...watchlist, movie.id]);
    }
  };

  const addWatchlist = (showId) => {
    fetch("https://academics.newtonschool.co/api/v1/ott/watchlist/like", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${YOUR_JWT_TOKEN}`,
        projectID: PROJECT_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ showId: showId }),
    })
      .then((response) => response.json())
      .then((data) => setWatchlistItems(data.data.shows))
      .catch((error) => {
        console.error("Error: ", error);
        throw error;
      });
  };

  return (
    <div className="movie-slider-container">
      <div className="movie-slider">
        <button className="slider-button prev" onClick={prevSlide}>
          <i className="fas fa-angle-left"></i>
        </button>
        <div className="slider-content">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`slide ${index === currentIndex ? "active" : ""}`}
              onMouseEnter={() => setHoveredMovie(movie)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              <img src={movie.thumbnail} alt={movie.title} />
              <div className="movie-info">
                {hoveredMovie === movie && (
                  <div className="additional-info">
                    <p>{movie.title}</p>
                    <p>Directed by: {movie.director}</p>
                    <p>
                      Cast: {movie.cast[0]}, {movie.cast[1]}
                    </p>
                    <Button
                      variant="contained"
                      color="primary"
                      className={`watchlist-button ${
                        watchlist.includes(movie.id) ? "added" : ""
                      }`}
                      onClick={() => {
                        toggleWatchlist(movie);
                        addWatchlist(movie._id);
                      }}
                    >
                      {watchlist.includes(movie.id)
                        ? "Added"
                        : "Add to Watchlist"}
                    </Button>
                    &nbsp;
                    <Button variant="contained" color="primary">
                      <a
                        href={movie.video_url}
                        target="_blank"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Watch now
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="slider-button next" onClick={nextSlide}>
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
