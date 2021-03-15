import { Link } from "react-router-dom";

import "./Card.scss";
import defaultPoster from "../../images/default-poster.jpg";

const Card = (props) => {
  return (
    <>
      {props.list.map((item) => {
        return (
          <Link key={Math.random()} to={`/movies/${item.id}`}>
            <article key={item.id} className="item-movie-card">
              <div className="item-movie-poster">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w154/${item.poster_path}`
                      : defaultPoster
                  }
                  alt="Poster for movie"
                />
              </div>

              <div className="item-movie-info">
                <h2 className="item-movie-header">
                  <span className="item-movie-title">{item.title}</span>
                  {item.vote_count > 0 && (
                    <span className="item-movie-rating">
                      {item.vote_average}
                      <i className="fa fa-star"></i>
                    </span>
                  )}{" "}
                </h2>
                <p>{item.overview}</p>
                {item.character && (
                  <h4 className="item-movie-character">
                    Character(s) : {item.character}
                  </h4>
                )}
              </div>
            </article>
          </Link>
        );
      })}
    </>
  );
};

export default Card;
