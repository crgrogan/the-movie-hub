import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Banner.scss";

const Banner = () => {
  const [posterMovie, setPosterMovie] = useState({});

  useEffect(async () => {
    let res = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=0e221d8f43d840531124c98dbd153f0c&language=en-US&page=1&region=IE"
    );
    let currentId = res.data.results[0].id;
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${currentId}?api_key=0e221d8f43d840531124c98dbd153f0c&language=en-US`
    );
    setPosterMovie(data);
  }, []);

  return (
    <div className="poster">
      <Link
        to="/specificmovie"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${posterMovie.backdrop_path}`}
          alt="Backdrop image for movie"
        />
        <div className="movie-info">
          <h3>Now Playing</h3>
          <h1 className="banner-heading">{posterMovie.title}</h1>
          <p>
            {posterMovie.genres && posterMovie.genres[0].name} |{" "}
            {posterMovie.vote_average} <i className="fa fa-star"></i>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Banner;
