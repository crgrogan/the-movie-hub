import { combineReducers } from "redux";

import { userInfoReducers, sessionReducers } from "./authReducers";
import { actorReducers } from "./actorReducers";
import {
  keywordReducers,
  genresReducers,
  categoryReducers,
  selectedMovieReducers,
} from "./movieReducers";
import { accountListsReducers } from "./userReducers";

const rootReducer = combineReducers({
  session: sessionReducers,
  user: userInfoReducers,
  keywordQuery: keywordReducers,
  genres: genresReducers,
  categories: categoryReducers,
  actor: actorReducers,
  selectedMovie: selectedMovieReducers,
  updateLists: accountListsReducers,
});

export default rootReducer;
