import axios from "axios";

export const keywordSearch = (queryString, page) => async (dispatch) => {
  dispatch({
    type: "KEYWORD_SEARCH_REQUEST",
    payload: queryString,
  });
  try {
    let searchRes = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${queryString}&page=${page}&include_adult=false`
    );
    dispatch({
      type: "KEYWORD_SEARCH_SUCCESS",
      payload: { data: searchRes.data.results, page },
    });
  } catch (err) {
    dispatch({
      type: "KEYWORD_SEARCH_FAILED",
    });
    console.log(err.message);
  }
};

export const getGenres = () => async (dispatch) => {
  dispatch({
    type: "GENRES_LIST_REQUEST",
  });
  try {
    let genresRes = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    );
    dispatch({
      type: "GENRES_LIST_SUCCESS",
      payload: genresRes.data.genres,
    });
  } catch (err) {
    dispatch({
      type: "GENRES_LIST_FAILED",
    });
    console.log(err.message);
  }
};

export const getMovieCategories = () => async (dispatch) => {
  dispatch({
    type: "MOVIE_CATEGORY_REQUEST",
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
      type: "MOVIE_CATEGORY_SUCCESS",
      payload: {
        nowPlaying: nowPlayingRes.data.results,
        upcoming: upcomingRes.data.results,
        topRated: topRatedRes.data.results,
        popular: popularRes.data.results,
      },
    });
  } catch (err) {
    dispatch({
      type: "MOVIE_CATEGORY_FAILED",
    });
    console.log(err.message);
  }
};

export const getSelectedMovie = (id) => async (dispatch) => {
  dispatch({
    type: "MOVIE_DETAILS_REQUEST",
  });
  try {
    let selectedMovieRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=credits,trailers,reviews,images&include_image_language=en,null`
    );
    dispatch({
      type: "MOVIE_DETAILS_SUCCESS",
      payload: selectedMovieRes.data,
    });
  } catch (err) {
    dispatch({
      type: "MOVIE_DETAILS_FAILED",
    });
    console.log(err.message);
  }
};

export const getSimilarMovies = (id) => async (dispatch) => {
  dispatch({
    type: "SIMILAR_MOVIES_REQUEST",
  });
  try {
    let similarMoviesRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
    );
    dispatch({
      type: "SIMILAR_MOVIES_SUCCESS",
      payload: similarMoviesRes.data.results,
    });
  } catch (err) {
    dispatch({
      type: "SIMILAR_MOVIES_FAILED",
    });
    console.log(err.message);
  }
};
