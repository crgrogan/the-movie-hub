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
