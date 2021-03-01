import { combineReducers } from "redux";

import { userInfoReducers, sessionReducers } from "./authReducers";
import {
  favouritesReducers,
  ratedReducers,
  watchlistReducers,
  listReducers,
} from "./movieReducers";

const rootReducer = combineReducers({
  session: sessionReducers,
  user: userInfoReducers,
  favouritesList: favouritesReducers,
  ratedList: ratedReducers,
  watchlist: watchlistReducers,
  lists: listReducers,
});

export default rootReducer;
