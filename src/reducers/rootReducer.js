import { combineReducers } from "redux";

import { userInfoReducers, sessionReducers } from "./authReducers";
import { keywordReducers } from "./movieReducers";

const rootReducer = combineReducers({
  session: sessionReducers,
  user: userInfoReducers,
  keywordQuery: keywordReducers,
});

export default rootReducer;
