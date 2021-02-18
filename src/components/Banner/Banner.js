import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Glide from "@glidejs/glide";

import "./Banner.scss";
import stockPhoto from "../../images/stock-photo.jpg";

const Banner = () => {
  const [posterMovie, setPosterMovie] = useState([]);

  useEffect(async () => {
    let res = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=0e221d8f43d840531124c98dbd153f0c&language=en-US&page=1&region=IE"
    );
    /* let currentId = res.data.results[0].id;
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${currentId}?api_key=0e221d8f43d840531124c98dbd153f0c&language=en-US`
    ); */
    setPosterMovie(res.data.results);
    new Glide(".glide", {
      type: "slider",
      startAt: 0,
      autoplay: 7000,
    }).mount();
  }, []);

  return (
    <div className="poster">
      {/*  <Link
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
      </Link> */}
      <div className={`glide`}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {posterMovie.map((movie) => (
              <li key={movie.id} className="glide__slide">
                <Link to="/specificmovie">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                        : { stockPhoto }
                    }
                    alt="Poster for movie"
                  />
                  <div className="movie-info">
                    <p>Now Playing</p>
                    <h1 className="banner-heading">{movie.title}</h1>
                    <p>
                      Genre | {movie.vote_average}{" "}
                      <i className="fa fa-star"></i>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
