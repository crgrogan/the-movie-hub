import * as actions from "../actions/types";

export const accountListsReducers = (state = { isLoading: true }, action) => {
  switch (action.type) {
    case actions.UPDATE_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actions.UPDATE_ACCOUNT_FAILED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
