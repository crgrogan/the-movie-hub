import * as actions from "../actions/types";

export const navbarReducers = (
  state = { menuOpen: false, searchOpen: false },
  action
) => {
  switch (action.type) {
    case actions.TOGGLE_MENU:
      return {
        ...state,
        menuOpen: action.payload,
      };
    case actions.TOGGLE_SEARCH:
      return {
        ...state,
        searchbarOpen: action.payload,
      };
    default:
      return state;
  }
};
