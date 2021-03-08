import * as actions from "../actions/types";

export const accountStatesReducers = (state = { isLoading: true }, action) => {
  switch (action.type) {
    case actions.UPDATE_ACCOUNT_REQUEST:
    case actions.RATE_MOVIE_REQUEST:
    case actions.DELETE_RATING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.UPDATE_ACCOUNT_SUCCESS:
    case actions.RATE_MOVIE_SUCCESS:
    case actions.DELETE_RATING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actions.UPDATE_ACCOUNT_FAILED:
    case actions.RATE_MOVIE_FAILED:
    case actions.DELETE_RATING_FAILED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
