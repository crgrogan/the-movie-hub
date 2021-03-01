import axios from "axios";
import Cookie from "js-cookie";

import { getLists } from "./movieActions";

export const getToken = () => async (dispatch) => {
  let res = await axios.get(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
  );
  const token = res.data.request_token;
  window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/`;
  return dispatch({ type: "GET_TOKEN" });
};

export const getSession = (token) => async (dispatch) => {
  try {
    let session = await axios.post(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
      {
        request_token: token,
      }
    );
    if (session.status === 200) {
      Cookie.set("tmh_session_id", session.data.session_id);
      dispatch({
        type: "SET_SESSION_ID",
        payload: session.data.session_id,
      });
      return dispatch(getUser(session.data.session_id));
    } else {
      console.log("Invalid token");
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const getUser = (sessionId) => async (dispatch) => {
  dispatch({
    type: "USER_INFO_REQUEST",
  });
  try {
    let user = await axios.get(
      `https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${sessionId}`
    );
    let favouritesList = await axios.get(
      `https://api.themoviedb.org/3/account/${user.data.id}/favorite/movies?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
    );
    let ratedList = await axios.get(
      `https://api.themoviedb.org/3/account/${user.data.id}/rated/movies?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
    );
    let watchlist = await axios.get(
      `https://api.themoviedb.org/3/account/${user.data.id}/watchlist/movies?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
    );
    dispatch({
      type: "USER_INFO_SUCCESS",
      payload: {
        userInfo: user.data,
        favouritesList: favouritesList.data,
        ratedList: ratedList.data,
        watchlist: watchlist.data,
      },
    });
  } catch (err) {
    return dispatch({ type: "USER_INFO_FAILED", payload: err.message });
  }
};

export const deleteSession = (sessionId) => async (dispatch) => {
  dispatch({
    type: "SESSION_DELETE_REQUEST",
  });
  try {
    let logout = await axios.post(
      `https://api.themoviedb.org/3/authentication/session?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
      {
        request_token: sessionId,
      }
    );
    dispatch({
      type: "SESSION_DELETE_SUCCESS",
    });
  } catch (err) {
    return dispatch({ type: "SESSION_DELETE_FAILED", payload: err.message });
  }
};
