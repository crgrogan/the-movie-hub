import * as actions from "./types";

export const changeNavbar = (type, status) => async (dispatch) => {
  if (type === "menu") {
    dispatch({
      type: actions.TOGGLE_MENU,
      payload: status,
    });
  } else if (type === "search") {
    dispatch({
      type: actions.TOGGLE_SEARCH,
      payload: status,
    });
  }
};
