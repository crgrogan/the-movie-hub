export const keywordReducers = (state = {}, action) => {
  switch (action.type) {
    case "KEYWORD_SEARCH_REQUEST":
      return {
        ...state,
        queryString: action.payload,
        isLoading: true,
      };
    case "KEYWORD_SEARCH_SUCCESS":
      return {
        ...state,
        searchResults: action.payload.data,
        page: action.payload.page,
        isLoading: false,
      };
    case "KEYWORD_SEARCH_FAILED":
      return { ...state, searchResults: "", page: 1, isLoading: false };
    default:
      return state;
  }
};

export const genresReducers = (state = { genresList: [] }, action) => {
  switch (action.type) {
    case "GENRES_LIST_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "GENRES_LIST_SUCCESS":
      return {
        ...state,
        genresList: action.payload,
        isLoading: false,
      };
    case "GENRES_LIST_FAILED":
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
    case "MOVIE_CATEGORY_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "MOVIE_CATEGORY_SUCCESS":
      return {
        ...state,
        nowPlaying: action.payload.nowPlaying,
        upcoming: action.payload.upcoming,
        topRated: action.payload.topRated,
        popular: action.payload.popular,
        isLoading: false,
      };
    case "MOVIE_CATEGORY_FAILED":
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
  state = { movieDetails: {}, isLoading: true },
  action
) => {
  switch (action.type) {
    case "MOVIE_DETAILS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "MOVIE_DETAILS_SUCCESS":
      return {
        ...state,
        movieDetails: action.payload,
        isLoading: false,
      };
    case "MOVIE_DETAILS_FAILED":
      return { ...state, movieDetails: [], isLoading: false };
    default:
      return state;
  }
};

export const similarMoviesReducers = (
  state = { similarMovies: [], isLoading: true },
  action
) => {
  switch (action.type) {
    case "SIMILAR_MOVIES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "SIMILAR_MOVIES_SUCCESS":
      return {
        ...state,
        similarMovies: action.payload,
        isLoading: false,
      };
    case "SIMILAR_MOVIES_FAILED":
      return { ...state, similarMovies: [], isLoading: false };
    default:
      return state;
  }
};

