import * as actions from "../actions/types";

export const keywordReducers = (state = {}, action) => {
  switch (action.type) {
    case actions.KEYWORD_SEARCH_REQUEST:
      return {
        ...state,
        queryString: action.payload,
        isLoading: true,
      };
    case actions.KEYWORD_SEARCH_SUCCESS:
      return {
        ...state,
        searchResults: action.payload.data,
        page: action.payload.page,
        isLoading: false,
      };
    case actions.KEYWORD_SEARCH_FAILED:
      return { ...state, searchResults: "", page: 1, isLoading: false };
    default:
      return state;
  }
};

export const genresReducers = (state = { genresList: [] }, action) => {
  switch (action.type) {
    case actions.GENRES_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GENRES_LIST_SUCCESS:
      return {
        ...state,
        genresList: action.payload,
        isLoading: false,
      };
    case actions.GENRES_LIST_FAILED:
      return { ...state, genresList: [], isLoading: false };
    default:
      return state;
  }
};

export const categoryReducers = (
  state = { nowPlaying: [], upcoming: [], topRated: [], popular: [] },
  action
) => {
  switch (action.type) {
    case actions.MOVIE_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.MOVIE_CATEGORY_SUCCESS:
      return {
        ...state,
        nowPlaying: action.payload.nowPlaying,
        upcoming: action.payload.upcoming,
        topRated: action.payload.topRated,
        popular: action.payload.popular,
        isLoading: false,
      };
    case actions.MOVIE_CATEGORY_FAILED:
      return {
        ...state,
        nowPlaying: [],
        upcoming: [],
        topRated: [],
        popular: [],
        isLoading: false,
      };
    default:
      return state;
  }
};

export const selectedMovieReducers = (
  state = {
    movieDetails: {},
    similarMovies: [],
    accountStates: {},
    isLoading: true,
  },
  action
) => {
  switch (action.type) {
    case actions.MOVIE_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        movieDetails: action.payload.selectedMovie,
        similarMovies: action.payload.similarMovies,
        accountStates: action.payload.accountStates,
        isLoading: false,
      };
    case actions.MOVIE_DETAILS_FAILED:
      return { ...state, movieDetails: [], isLoading: false };
    default:
      return state;
  }
};
