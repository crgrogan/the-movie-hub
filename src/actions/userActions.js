import axios from "axios";

import * as actions from "./types";
import { getUser } from "./authActions";

export const updateAccountLists = (listType, movieId, action) => async (
  dispatch,
  getState
) => {
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
    await axios.post(
      `https://api.themoviedb.org/3/account/${userInfo.id}/${listType}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${sessionId}`,
      {
        media_type: "movie",
        media_id: movieId,
        [listType]: action,
      }
    );
    await dispatch(getUser(sessionId));
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

export const rateMovie = (rating, movieId) => async (dispatch, getState) => {
  dispatch({
    type: actions.RATE_MOVIE_REQUEST,
  });
  try {
    const {
      session: { sessionId },
    } = getState();
    await axios.post(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${sessionId}`,
      {
        value: rating,
      }
    );
    await dispatch(getUser(sessionId));
    dispatch({
      type: actions.RATE_MOVIE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: actions.RATE_MOVIE_FAILED,
    });
    console.log(err.message);
  }
};

export const removeRating = (movieId) => async (dispatch, getState) => {
  dispatch({
    type: actions.DELETE_RATING_REQUEST,
  });
  try {
    const {
      session: { sessionId },
    } = getState();
    await axios.delete(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${sessionId}`
    );
    await dispatch(getUser(sessionId));
    dispatch({
      type: actions.DELETE_RATING_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: actions.DELETE_RATING_FAILED,
    });
    console.log(err.message);
  }
};
