import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

import rootReducer from "./reducers/rootReducer";

let sessionId = Cookie.get("tmh_session_id") || null;

const initialState = {
  session: { sessionId },
  user: { isLoading: true },
};

const enhancers = [applyMiddleware(thunk)];

const store = createStore(rootReducer, initialState, compose(...enhancers));

export default store;
