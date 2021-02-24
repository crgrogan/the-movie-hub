import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Glide from "@glidejs/glide";

import "./Banner.scss";
import defaultBackdrop from "../../images/default-backdrop.jpg";
import { getGenre } from "../../utils";

const Banner = () => {
  const [bannerMovie, setBannerMovie] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const [genresList, setGenresList] = useState([]);

  useEffect(async () => {
    let genresRes = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    );
    setGenresList(genresRes.data.genres);

    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
    );
    setBannerMovie(res.data.results);
    setBannerImages(res.data.results.images);

    new Glide(".glide", {
      type: "slider",
      startAt: 0,
      autoplay: 7000,
    }).mount();
  }, []);

  return (
    <div className="poster">
      <div className={`glide`}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {bannerMovie.map((movie) => (
              <li key={movie.id} className="glide__slide">
                <Link to={`/movies/${movie.id}`}>
                  <img
                    src={
                      movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                        : defaultBackdrop
                    }
                    alt="Backdrop for movie"
                  />
                  <div className="movie-info">
                    <p>Now Playing</p>
                    <h1 className="banner-heading">{movie.title}</h1>
                    <p>
                      {getGenre(movie.genre_ids[0], genresList)} |{" "}
                      {movie.vote_count !== 0 ? (
                        <span>
                          {movie.vote_average} <i className="fa fa-star"></i>
                        </span>
                      ) : (
                        <span>Not Rated</span>
                      )}
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
