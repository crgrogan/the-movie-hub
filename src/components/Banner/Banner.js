import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Glide from "@glidejs/glide";

import "./Banner.scss";
import defaultBackdrop from "../../images/default-backdrop.jpg";

const Banner = () => {
  const [bannerMovie, setBannerMovie] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);

  useEffect(async () => {
    let res = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=0e221d8f43d840531124c98dbd153f0c&language=en-US&page=1&region=IE"
    );
    console.log(res.data);
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
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                        : { defaultBackdrop }
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
