import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../styles/SearchResults.css";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

function SearchResults() {
  const [res, setRes] = useState([]);
  const [num, setNum] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mouseOn, setMouseOn] = useState(null);
  const [theKey, setheKey] = useState([
    "title",
    "keywords",
    "type",
    "cast",
    "director",
  ]);
  const [status, setStatus] = useState("");

  const { theInput } = useParams();

  const getTheData = () => {
    if (status === "success") {
      setIsLoading(false);
      return;
    }

    fetch(
      "https://academics.newtonschool.co/api/v1/ott/show?filter=%7B%22" +
        theKey[num] +
        "%22%20%3A%20%22" +
        theInput +
        "%22%7D",
      {
        method: "GET",
        headers: {
          projectID: "f104bi07c490",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setRes(data.data);
          setIsLoading(false);
        } else {
          if (num < theKey.length - 1) {
            setNum(num + 1);
          } else {
            setRes([]);
            setIsLoading(false);
          }
        }
      });
  };

  useEffect(() => {
    getTheData();
  }, [num, theInput]);

  useEffect(() => {
    setNum(0);
  }, [theInput]);

  return (
    <div className="main-searchResults">
      <Navbar />
      <div className="searchResults">
        <h2>Results for "{theInput}" </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="searchlist-container">
            {Array.isArray(res) ? (
              res.map((show) => (
                <div
                  className="searchLists"
                  key={show._id}
                  onMouseOver={() => setMouseOn(show.title)}
                  onMouseLeave={() => setMouseOn(null)}
                >
                  {mouseOn === show.title ? (
                    <div id="hoveredSearch">
                      <video src={show.video_url} autoPlay />
                      <h2>{show.title}</h2>
                      <p>{show.description}</p>
                    </div>
                  ) : (
                    <img src={show.thumbnail} />
                  )}
                </div>
              ))
            ) : (
              <p>No search results found!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
