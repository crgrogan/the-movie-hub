import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Glide, { Breakpoints } from "@glidejs/glide/dist/glide.modular.esm";

import "./Carousel.scss";
import defaultPoster from "../../images/default-poster.jpg";
import { getGenre } from "../../utils";

const Carousel = (props) => {
  const { genresList } = useSelector((state) => state.genres);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    mountSlide();
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      mountSlide();
    };
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const mountSlide = () => {
    const sliders = document.querySelectorAll(`.glide-${props.title}`);

    sliders.forEach((item) => {
      new Glide(item, {
        type: "carousel",
        startAt: 0,
        perView: 7,
        breakpoints: {
          576: {
            perView: 2,
          },
          768: {
            perView: 4,
          },
        },
        gap: 25,
      }).mount({ Breakpoints });
    });
  };

  return (
    <section className="slider">
      <h1 className="category">{props.title.replace("-", " ")}</h1>
      <div className={`glide glide-${props.title}`}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {props.moviesList.map((movie) => (
              <li key={movie.id} className="glide__slide">
                <Link to={`/movies/${movie.id}`}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
                        : defaultPoster
                    }
                    alt="Poster for movie"
                  />
                  <h4 className="carousel-movie-title">{movie.title}</h4>
                  <h5>{getGenre(movie.genre_ids[0], genresList)}</h5>
                  {movie.vote_count !== 0 ? (
                    <span className="rating">
                      {movie.vote_average} <i className="fa fa-star"></i>
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button
            className="glide__arrow glide__arrow--left"
            data-glide-dir="<"
          >
            <i className="fa fa-angle-left slider-arrow"></i>
          </button>
          <button
            className="glide__arrow glide__arrow--right"
            data-glide-dir=">"
          >
            <i className="fa fa-angle-right slider-arrow"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
