import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useHistory } from "react-router-dom";
import Glide from "@glidejs/glide";

import "./MovieDetails.scss";
import defaultPerson from "../../images/default-person.png";
import defaultPoster from "../../images/default-poster.jpg";
import defaultBackdrop from "../../images/default-backdrop.jpg";
import { getGenre } from "../../utils";

const MovieDetails = () => {
  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState({});
  const [images, setImages] = useState([]);
  const [cast, setCast] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    let genresRes = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    );
    setGenresList(genresRes.data.genres);
    let similarMoviesRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
    );
    setSimilarMovies(similarMoviesRes.data.results);
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=credits,trailers,reviews,images&include_image_language=en,null`
    );
    setSelectedMovie(res.data);
    setImages(res.data.images);
    setCast(res.data.credits.cast.slice(0, 15));
    setTrailers(res.data.trailers.youtube.slice(0, 6));
    setReviews(res.data.reviews.results);
    const glideCast = document.querySelectorAll(".glide-cast");
    const glideTrailers = document.querySelectorAll(".glide-trailers");
    const glideSimilarMovies = document.querySelectorAll(
      ".glide-similar-movies"
    );

    glideCast.forEach((item) => {
      new Glide(item, {
        type: "carousel",
        startAt: 0,
        perView: 5,
        gap: 50,
      }).mount();
    });
    glideTrailers.forEach((item) => {
      new Glide(item, {
        type: "carousel",
        startAt: 0,
        perView: 3,
        gap: 25,
      }).mount();
    });
    glideSimilarMovies.forEach((item) => {
      new Glide(item, {
        type: "carousel",
        startAt: 0,
        perView: 7,
        gap: 25,
      }).mount();
    });
  }, [id]);

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="selected-movie-container">
      <section className="selected-movie-img-container">
        <img
          src={
            images.backdrops && images.backdrops[0]
              ? `https://image.tmdb.org/t/p/original/${images.backdrops[0].file_path}`
              : defaultBackdrop
          }
          alt="Backdrop image for movie"
        />
      </section>
      <section className="selected-movie-details">
        <section className="selected-movie-info">
          <img
            className="selected-movie-poster"
            src={
              images.posters && images.posters[0]
                ? `https://image.tmdb.org/t/p/w154/${images.posters[0].file_path}`
                : defaultPoster
            }
            alt="Poster image for movie"
          />
          <div className="selected-movie-headings">
            <h1 className="selected-movie-title">{selectedMovie.title}</h1>
            <ul>
              <li>
                {selectedMovie.genres && selectedMovie.genres[0] && (
                  <div className="selected-movie-genre">
                    <span>{selectedMovie.genres[0].name}</span>{" "}
                    {selectedMovie.genres.length > 1 && (
                      <span>/ {selectedMovie.genres[1].name}</span>
                    )}
                  </div>
                )}
              </li>
              <li>
                |
                {selectedMovie.vote_count !== 0 ? (
                  <span className="selected-movie-rating">
                    {selectedMovie.vote_average} <i className="fa fa-star"></i>
                  </span>
                ) : (
                  <span className="selected-movie-rating">Not Rated</span>
                )}
              </li>
              <li>
                |
                <span className="selected-movie-rating">
                  {selectedMovie.runtime} mins
                </span>
              </li>
            </ul>
          </div>
        </section>
        <section className="overview mb-5">
          <h2>Overview</h2>
          <p>{selectedMovie.overview}</p>
        </section>
        <section className="cast mb-5">
          <h2>Cast</h2>
          {cast && cast.length > 0 ? (
            <div className="glide glide-cast">
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                  {cast.map((person) => (
                    <li key={person.id} className="glide__slide">
                      <Link to={`/actors/${person.id}`}>
                        <img
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w185/${person.profile_path}`
                              : defaultPerson
                          }
                          alt="Image of the actor"
                        />
                        <h4>{person.name}</h4>
                        <h5>{person.character}</h5>
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
          ) : (
            <p className="nothing-to-display">No cast information to display</p>
          )}
        </section>
        <section className="trailers mb-5">
          <h2>Trailers</h2>
          {trailers && trailers.length > 0 ? (
            <div className="glide glide-trailers">
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                  {trailers &&
                    trailers.map((trailer) => (
                      <li key={trailer.id} className="glide__slide">
                        <iframe
                          width="320"
                          height="240"
                          src={`https://www.youtube.com/embed/${trailer.source}`}
                        ></iframe>
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
          ) : (
            <p className="nothing-to-display">No trailers to display</p>
          )}
        </section>
        <section className="reviews mb-10">
          <h2>Reviews</h2>
          {reviews && reviews.length > 0 ? (
            reviews.slice(0, 7).map((review) => (
              <article key={review.id} className="review-card">
                <h3 className="review-author">By {review.author}</h3>
                <p className="review-body">{review.content}</p>
                <a
                  href={review.url}
                  target="_blank"
                  className="full-review-btn"
                >
                  See full review <i className="fa fa-chevron-right"></i>
                </a>
              </article>
            ))
          ) : (
            <p className="nothing-to-display">No reviews to display</p>
          )}
        </section>
        <section className="similar-movies mb-5">
          <h2>Similar Movies</h2>
          {similarMovies && similarMovies.length > 0 ? (
            <div className={"glide glide-similar-movies"}>
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                  {similarMovies.map((movie) => (
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
                        <h4>{movie.title}</h4>
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
          ) : (
            <p className="nothing-to-display">No Similar Movies to display</p>
          )}
        </section>
        <button onClick={goBack} className="back-btn">
          <i className="fa fa-arrow-left"></i>
        </button>
      </section>
    </div>
  );
};

export default MovieDetails;
