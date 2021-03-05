import * as actions from "../actions/types";

export const userInfoReducers = (state = {}, action) => {
  switch (action.type) {
    case actions.GET_TOKEN:
      return { ...state, isLoading: true };
    case actions.USER_INFO_REQUEST:
      return { ...state, isLoading: true };
    case actions.USER_INFO_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.payload.userInfo,
        isLoading: false,
        favouritesList: action.payload.favouritesList,
        ratedList: action.payload.ratedList,
        watchlist: action.payload.watchlist,
        error: null,
      };
    case actions.USER_INFO_FAILED:
    case actions.DELETE_USER:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: {},
        isLoading: false,
        favouritesList: {},
        ratedList: {},
        watchlist: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export const sessionReducers = (state = { sessionId: null }, action) => {
  switch (action.type) {
    case actions.SET_SESSION_ID:
      return { ...state, sessionId: action.payload };
    case actions.SESSION_DELETE_SUCCESS:
      return { ...state, sessionId: null };
    case actions.SESSION_DELETE_FAILED:
    default:
      return state;
  }
};
