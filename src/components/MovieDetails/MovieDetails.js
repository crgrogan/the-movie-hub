import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import Glide from "@glidejs/glide";
import Loader from "react-loader-spinner";

import "./MovieDetails.scss";
import defaultPerson from "../../images/default-person.png";
import defaultPoster from "../../images/default-poster.jpg";
import defaultBackdrop from "../../images/default-backdrop.jpg";
import { getGenre } from "../../utils";
import { getSelectedMovie, getSimilarMovies } from "../../actions/movieActions";
import { useComponentWillMount } from "../../customHooks";

const MovieDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { movieDetails, isLoading } = useSelector(
    (state) => state.selectedMovie
  );
  const { similarMovies, isLoading: similarMoviesLoading } = useSelector(
    (state) => state.similarMovies
  );
  const { genresList } = useSelector((state) => state.genres);

  useComponentWillMount(() => {
    console.log("will mount");
    dispatch(getSelectedMovie(id));
    dispatch(getSimilarMovies(id));
  });

  useEffect(async () => {
    const glideCast = document.querySelectorAll(".glide-cast");
    const glideTrailers = document.querySelectorAll(".glide-trailers");
    const glideSimilarMovies = document.querySelectorAll(
      ".glide-similar-movies"
    );
    console.log(glideCast);
    glideCast &&
      glideCast.forEach((item) => {
        new Glide(item, {
          type: "carousel",
          startAt: 0,
          perView: 5,
          gap: 50,
        }).mount();
      });
    glideTrailers &&
      glideTrailers.forEach((item) => {
        new Glide(item, {
          type: "carousel",
          startAt: 0,
          perView: 3,
          gap: 25,
        }).mount();
      });
    glideSimilarMovies &&
      glideSimilarMovies.forEach((item) => {
        new Glide(item, {
          type: "carousel",
          startAt: 0,
          perView: 7,
          gap: 25,
        }).mount();
      });
  }, [isLoading]);

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="selected-movie-container">
      {isLoading ? (
        <div className="loader-container">
          <Loader type="Puff" color="#faed26" height={100} width={100} />
        </div>
      ) : (
        <>
          <section className="selected-movie-img-container">
            <img
              src={
                movieDetails.images.backdrops &&
                movieDetails.images.backdrops[0]
                  ? `https://image.tmdb.org/t/p/original/${movieDetails.images.backdrops[0].file_path}`
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
                  movieDetails.images.posters && movieDetails.images.posters[0]
                    ? `https://image.tmdb.org/t/p/w154/${movieDetails.images.posters[0].file_path}`
                    : defaultPoster
                }
                alt="Poster image for movie"
              />
              <div className="selected-movie-headings">
                <h1 className="selected-movie-title">{movieDetails.title}</h1>
                <ul>
                  <li>
                    {movieDetails.genres && movieDetails.genres[0] && (
                      <div className="selected-movie-genre">
                        <span>{movieDetails.genres[0].name}</span>{" "}
                        {movieDetails.genres.length > 1 && (
                          <span>/ {movieDetails.genres[1].name}</span>
                        )}
                      </div>
                    )}
                  </li>
                  <li>
                    |
                    {movieDetails.vote_count !== 0 ? (
                      <span className="selected-movie-rating">
                        {movieDetails.vote_average}{" "}
                        <i className="fa fa-star"></i>
                      </span>
                    ) : (
                      <span className="selected-movie-rating">Not Rated</span>
                    )}
                  </li>
                  <li>
                    |
                    <span className="selected-movie-rating">
                      {movieDetails.runtime} mins
                    </span>
                  </li>
                </ul>
              </div>
            </section>
            <section className="overview mb-5">
              <h2>Overview</h2>
              <p>{movieDetails.overview}</p>
            </section>
            <section className="cast mb-5">
              <h2>Cast</h2>
              {movieDetails.credits.cast.length > 0 ? (
                <div className="glide glide-cast">
                  <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                      {movieDetails.credits.cast.slice(0, 15).map((person) => (
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
                <p className="nothing-to-display">
                  No cast information to display
                </p>
              )}
            </section>
            <section className="trailers mb-5">
              <h2>Trailers</h2>
              {movieDetails.trailers.youtube.length > 0 ? (
                <div className="glide glide-trailers">
                  <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                      {movieDetails.trailers.youtube
                        .slice(0, 6)
                        .map((trailer) => (
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
              {movieDetails.reviews.results.length > 0 ? (
                movieDetails.reviews.results.slice(0, 7).map((review) => (
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
                                {movie.vote_average}{" "}
                                <i className="fa fa-star"></i>
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
                <p className="nothing-to-display">
                  No Similar Movies to display
                </p>
              )}
            </section>
            <button onClick={goBack} className="back-btn">
              <i className="fa fa-arrow-left"></i>
            </button>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
