import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Glide from "@glidejs/glide";

import "./Banner.scss";
import defaultBackdrop from "../../images/default-backdrop.jpg";
import { getGenre } from "../../utils";

const Banner = (props) => {
  const { genresList } = useSelector((state) => state.genres);

  useEffect(async () => {
    new Glide(".glide-slider", {
      type: "slider",
      startAt: 0,
      autoplay: 7000,
    }).mount();
  }, []);

  return (
    <div className="poster">
      <div className={"glide glide-slider"}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {props.moviesList.map((movie) => (
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
                    <p>Latest</p>
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
