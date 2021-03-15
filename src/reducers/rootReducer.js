import { combineReducers } from "redux";

import { userInfoReducers, sessionReducers } from "./authReducers";
import { actorReducers } from "./actorReducers";
import {
  keywordReducers,
  genresReducers,
  categoryReducers,
  selectedMovieReducers,
} from "./movieReducers";
import { accountStatesReducers } from "./userReducers";
import { navbarReducers } from "./navbarReducers";

const rootReducer = combineReducers({
  session: sessionReducers,
  user: userInfoReducers,
  keywordQuery: keywordReducers,
  genres: genresReducers,
  categories: categoryReducers,
  actor: actorReducers,
  selectedMovie: selectedMovieReducers,
  updateStates: accountStatesReducers,
  navbarStates: navbarReducers,
});

export default rootReducer;
