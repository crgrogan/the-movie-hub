import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

import "./ActorDetails.scss";
import Card from "../Card/Card";
import defaultPerson from "../../images/default-person.png";
import defaultPoster from "../../images/default-poster.jpg";
import { getActorDetails } from "../../actions/actorActions";

const ActorDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const { actorDetails, isLoading } = useSelector((state) => state.actor);

  useEffect(async () => {
    dispatch(getActorDetails(id));
  }, []);

  const goBack = () => {
    history.goBack();
  };

  console.log(actorDetails, isLoading);

  return (
    <section className="actor-details-container">
      {isLoading ? (
        <div className="loader-container">
          <Loader type="Puff" color="#faed26" height={100} width={100} />
        </div>
      ) : (
        <>
          <button onClick={goBack} className="back-btn">
            <i className="fa fa-arrow-left"></i>
          </button>

          <section className="actor-details-info">
            <div className="actor-details-img-container">
              <img
                src={
                  actorDetails.profile_path
                    ? `https://image.tmdb.org/t/p/w185/${actorDetails.profile_path}`
                    : defaultPerson
                }
                alt="Image of the actor"
              />
            </div>
            <div>
              <h1 className="actor-details-name">{actorDetails.name}</h1>
              <div className="actor-details-basic-info">
                {actorDetails.birthday &&
                  (() => {
                    let bday = actorDetails.birthday.split("-");
                    let date = new Date(bday[0], bday[1], bday[2]);
                    return (
                      <div className="actor-details-birthday">
                        <h3>Born:</h3>{" "}
                        {date.toLocaleString("en-gb", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                        in {actorDetails.place_of_birth}
                      </div>
                    );
                  })()}
              </div>
              <article className="biography">
                <h2>Biography</h2>
                <p>{actorDetails.biography}</p>
              </article>
            </div>
          </section>
          <section className="credited-movies">
            <h2>Popular Movies</h2>
            <Card list={actorDetails.movie_credits.cast.slice(0, 15)} />
            {/*  {actorDetails.movie_credits &&
            actorDetails.movie_credits.cast.length > 0
              ? actorDetails.movie_credits.cast.slice(0, 15).map((movie) => {
                  return (
                    <Link to={`/movies/${movie.id}`}>
                      <article key={movie.id} className="credited-movie-card">
                        <div className="credited-movie-poster">
                          <img
                            src={
                              movie.poster_path
                                ? `https://image.tmdb.org/t/p/w154/${movie.poster_path}`
                                : defaultPoster
                            }
                            alt="Poster for movie"
                          />
                        </div>

                        <div className="credited-movie-info">
                          <h2 className="credited-movie-header">
                            {movie.title}
                            {movie.vote_count > 0 && (
                              <span className="credited-movie-rating">
                                Rating: {movie.vote_average}
                                <i className="fa fa-star"></i>
                              </span>
                            )}{" "}
                          </h2>
                          <p>{movie.overview}</p>
                          <h4>Character: {movie.character}</h4>
                        </div>
                      </article>
                    </Link>
                  );
                })
              : ""} */}
          </section>
        </>
      )}
    </section>
  );
};

export default ActorDetails;
