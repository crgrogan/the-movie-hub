import { combineReducers } from "redux";

import { userInfoReducers, sessionReducers } from "./authReducers";

const rootReducer = combineReducers({
  session: sessionReducers,
  user: userInfoReducers,
});

export default rootReducer;
