import axios from "axios";

import * as actions from "./types";

export const keywordSearch = (queryString, page) => async (dispatch) => {
  dispatch({
    type: actions.KEYWORD_SEARCH_REQUEST,
    payload: queryString,
  });
  try {
    let searchRes = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${queryString}&page=${page}&include_adult=false`
    );
    dispatch({
      type: actions.KEYWORD_SEARCH_SUCCESS,
      payload: { data: searchRes.data.results, page },
    });
  } catch (err) {
    dispatch({
      type: actions.KEYWORD_SEARCH_FAILED,
    });
    console.log(err.message);
  }
};

export const getGenres = () => async (dispatch) => {
  dispatch({
    type: actions.GENRES_LIST_REQUEST,
  });
  try {
    let genresRes = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    );
    dispatch({
      type: actions.GENRES_LIST_SUCCESS,
      payload: genresRes.data.genres,
    });
  } catch (err) {
    dispatch({
      type: actions.GENRES_LIST_FAILED,
    });
    console.log(err.message);
  }
};

export const getMovieCategories = () => async (dispatch) => {
  dispatch({
    type: actions.MOVIE_CATEGORY_REQUEST,
  });
  try {
    let nowPlayingRes = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
    );
    let upcomingRes = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
    );
    let topRatedRes = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
    );
    let popularRes = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
    );
    dispatch({
      type: actions.MOVIE_CATEGORY_SUCCESS,
      payload: {
        nowPlaying: nowPlayingRes.data.results,
        upcoming: upcomingRes.data.results,
        topRated: topRatedRes.data.results,
        popular: popularRes.data.results,
      },
    });
  } catch (err) {
    dispatch({
      type: actions.MOVIE_CATEGORY_FAILED,
    });
    console.log(err.message);
  }
};

export const getSelectedMovie = (movieId) => async (dispatch, getState) => {
  console.log("get selected");

  dispatch({
    type: actions.MOVIE_DETAILS_REQUEST,
  });

  try {
    const {
      session: { sessionId },
    } = getState();
    let selectedMovieRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=credits,trailers,reviews,images&include_image_language=en,null`
    );
    let similarMoviesRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
    );
    let accountStatesRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/account_states?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${sessionId}`
    );
    dispatch({
      type: actions.MOVIE_DETAILS_SUCCESS,
      payload: {
        selectedMovie: selectedMovieRes.data,
        similarMovies: similarMoviesRes.data.results,
        accountStates: accountStatesRes.data,
      },
    });
  } catch (err) {
    dispatch({
      type: actions.MOVIE_DETAILS_FAILED,
    });
    console.log(err.message);
  }
};
