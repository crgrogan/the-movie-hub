import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import Glide from "@glidejs/glide";
import Loader from "react-loader-spinner";
import StarsRating from "stars-rating";

import "./MovieDetails.scss";
import defaultPerson from "../../images/default-person.png";
import defaultPoster from "../../images/default-poster.jpg";
import defaultBackdrop from "../../images/default-backdrop.jpg";
import { useComponentWillMount, useDidMountEffect } from "../../customHooks";
import Carousel from "../Carousel/Carousel";
import { getSelectedMovie } from "../../actions/movieActions";
import {
  updateAccountLists,
  rateMovie,
  removeRating,
} from "../../actions/userActions";

const MovieDetails = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const {
    movieDetails,
    similarMovies,
    accountStates,
    isLoading: selectedMovieLoading,
  } = useSelector((state) => state.selectedMovie);
  const { isLoggedIn } = useSelector((state) => state.user);
  const favouriteIconRef = useRef();
  const watchlistIconRef = useRef();
  const ratedIconRef = useRef();

  useComponentWillMount(() => {
    dispatch(getSelectedMovie(id));
  });

  useDidMountEffect(() => {
    dispatch(getSelectedMovie(props.match.params.id));
  }, [props.match.params.id]);

  useEffect(async () => {
    const glideCast = document.querySelectorAll(".glide-cast");
    const glideTrailers = document.querySelectorAll(".glide-trailers");

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
    if (!selectedMovieLoading) {
      checkAccountLists();
    }
  }, [selectedMovieLoading]);

  const checkAccountLists = () => {
    if (accountStates) {
      if (accountStates.favorite) {
        favouriteIconRef.current.classList.add("active");
        favouriteIconRef.current.setAttribute(
          "data-title",
          "Remove from Favourites"
        );
      } else {
        favouriteIconRef.current.classList.remove("active");
        favouriteIconRef.current.setAttribute(
          "data-title",
          "Add to Favourites"
        );
      }
      if (accountStates.rated) {
        console.log(accountStates.rated.value);
        setRating(accountStates.rated.value / 2);
      }
      if (accountStates.watchlist) {
        watchlistIconRef.current.classList.add("active");
        watchlistIconRef.current.setAttribute(
          "data-title",
          "Remove from Watchlist"
        );
      } else {
        watchlistIconRef.current.classList.remove("active");
        watchlistIconRef.current.setAttribute("data-title", "Add to Watchlist");
      }
    }
  };

  const goBack = () => {
    history.goBack();
  };

  const updateWatchlist = (e, listType, movieId) => {
    if (e.target.parentElement.classList.contains("active")) {
      dispatch(updateAccountLists(listType, movieId, false));
      e.target.parentElement.classList.remove("active");
      e.target.parentElement.setAttribute("data-title", "Add to Watchlist");
    } else {
      dispatch(updateAccountLists(listType, movieId, true));
      e.target.parentElement.classList.add("active");
      e.target.parentElement.setAttribute(
        "data-title",
        "Remove from Watchlist"
      );
    }
  };

  const updateFavourites = (e, listType, movieId) => {
    if (e.target.parentElement.classList.contains("active")) {
      dispatch(updateAccountLists(listType, movieId, false));
      e.target.parentElement.classList.remove("active");
      e.target.parentElement.setAttribute("data-title", "Add to Favourites");
    } else {
      dispatch(updateAccountLists(listType, movieId, true));
      e.target.parentElement.classList.add("active");
      e.target.parentElement.setAttribute(
        "data-title",
        "Remove from Favourites "
      );
    }
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
    dispatch(rateMovie(newRating * 2, id));
  };

  const deleteRating = () => {
    dispatch(removeRating(id));
    setRating(0);
  };

  return (
    <div className="selected-movie-container">
      {selectedMovieLoading ? (
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
                        {movieDetails.vote_average}
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

                <div
                  className="user-actions"
                  style={
                    isLoggedIn
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                >
                  <button
                    onClick={(e) => updateWatchlist(e, "watchlist", id)}
                    ref={watchlistIconRef}
                  >
                    <i className="fa fa-bookmark watchlist-icon"></i>
                  </button>
                  <button
                    data-title="Add to Favourites"
                    onClick={(e) => updateFavourites(e, "favorite", id)}
                    ref={favouriteIconRef}
                  >
                    <i className="fa fa-heart favourite-icon"></i>
                  </button>
                  <span>
                    <StarsRating
                      ref={ratedIconRef}
                      count={5}
                      onChange={ratingChanged}
                      size={32}
                      className="stars-rating"
                      color1={"#fff"}
                      color2={"#faed26"}
                      value={rating}
                    />
                  </span>
                  {rating > 0 && (
                    <button data-title="Delete Rating" onClick={deleteRating}>
                      <i className="fa fa-minus-square delete-rating-btn"></i>
                    </button>
                  )}
                </div>
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
              {similarMovies && similarMovies.length > 0 ? (
                <Carousel title="Similar-Movies" moviesList={similarMovies} />
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
