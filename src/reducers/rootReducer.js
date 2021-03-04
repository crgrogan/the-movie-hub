import { combineReducers } from "redux";

import { userInfoReducers, sessionReducers } from "./authReducers";
import { actorReducers } from "./actorReducers";
import {
  keywordReducers,
  genresReducers,
  categoryReducers,
  selectedMovieReducers,
  similarMoviesReducers,
} from "./movieReducers";

const rootReducer = combineReducers({
  session: sessionReducers,
  user: userInfoReducers,
  keywordQuery: keywordReducers,
  genres: genresReducers,
  categories: categoryReducers,
  actor: actorReducers,
  selectedMovie: selectedMovieReducers,
  similarMovies: similarMoviesReducers,
});

export default rootReducer;
