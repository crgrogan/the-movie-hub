import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useHistory } from "react-router-dom";

import "./ActorDetails.scss";
import defaultPerson from "../../images/default-person.png";
import defaultPoster from "../../images/default-poster.jpg";

const ActorDetails = () => {
  const { id } = useParams();
  const [actorDetails, setActorDetails] = useState({});
  const history = useHistory();

  useEffect(async () => {
    let res = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=0e221d8f43d840531124c98dbd153f0c&language=en-US&append_to_response=movie_credits`
    );
    setActorDetails(res.data);
  }, []);

  const goBack = () => {
    history.goBack();
  };

  return (
    <section className="actor-details-container">
      {/* <button onClick={goBack} className="back-btn">
        <i className="fa fa-arrow-left"></i>
      </button> */}

      <section className="actor-details-info">
        <img
          src={
            actorDetails.profile_path
              ? `https://image.tmdb.org/t/p/w185/${actorDetails.profile_path}`
              : defaultPerson
          }
          alt="Image of the actor"
        />
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
        {actorDetails.movie_credits &&
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
          : ""}
      </section>
    </section>
  );
};

export default ActorDetails;
