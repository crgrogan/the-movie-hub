import axios from "axios";

import * as actions from "./types";
import { getAccountStates } from "./movieActions";

export const updateAccountLists = (listType, movieId, action) => async (
  dispatch,
  getState
) => {
  console.log(action);
  dispatch({
    type: actions.UPDATE_ACCOUNT_REQUEST,
  });
  try {
    const {
      session: { sessionId },
    } = getState();
    const {
      user: { userInfo },
    } = getState();
    let accountListRes = await axios.post(
      `https://api.themoviedb.org/3/account/${userInfo.id}/${listType}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${sessionId}`,
      {
        media_type: "movie",
        media_id: movieId,
        [listType]: action,
      }
    );
    dispatch({
      type: actions.UPDATE_ACCOUNT_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: actions.UPDATE_ACCOUNT_FAILED,
    });
    console.log(err.message);
  }
};
