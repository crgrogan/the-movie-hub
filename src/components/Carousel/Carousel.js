import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Glide from "@glidejs/glide";

import "./Carousel.scss";
import stockPhoto from "../../images/stock-photo.jpg";

const Carousel = (props) => {
  const [list, setList] = useState([]);

  useEffect(async () => {
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/${props.category}?api_key=0e221d8f43d840531124c98dbd153f0c&language=en-US&page=1&region=IE`
    );
    setList(res.data.results);
    const sliders = document.querySelectorAll(`.glide-${props.category}`);

    sliders.forEach((item) => {
      new Glide(item, {
        type: "carousel",
        startAt: 0,
        perView: 7,
        gap: 25,
      }).mount();
    });
  }, []);
  return (
    <section className="slider">
      <h1 className="category">{props.category.replace("_", " ")}</h1>
      <div className={`glide glide-${props.category}`}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {list.map((movie) => (
              <li key={movie.id} className="glide__slide">
                <Link to="/specificmovie">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
                        : stockPhoto
                    }
                    alt="Poster for movie"
                  />
                  <h4>{movie.title}</h4>
                  <h5>Genre</h5>
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
