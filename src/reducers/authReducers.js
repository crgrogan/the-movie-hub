export const userInfoReducers = (state = {}, action) => {
  switch (action.type) {
    case "GET_TOKEN":
      return { ...state, isLoading: true };
    case "USER_INFO_REQUEST":
      return { ...state, isLoading: true };
    case "USER_INFO_SUCCESS":
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
    case "USER_INFO_FAILED":
    case "DELETE_USER":
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
    case "SET_SESSION_ID":
      return { ...state, sessionId: action.payload };
    case "SESSION_DELETE_SUCCESS":
      return { ...state, sessionId: null };
    case "SESSION_DELETE_FAILED":
    default:
      return state;
  }
};
