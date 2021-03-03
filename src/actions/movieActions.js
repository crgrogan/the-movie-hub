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
    localStorage.setItem(
      "tmh_search_results",
      JSON.stringify(searchRes.data.results)
    );
    localStorage.setItem("tmh_search_page", page);
    localStorage.setItem("tmh_query_string", queryString);
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
