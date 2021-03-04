import axios from "axios";

export const getActorDetails = (id) => async (dispatch) => {
  dispatch({
    type: "ACTOR_DETAILS_REQUEST",
  });
  try {
    let res = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=movie_credits`
    );
    dispatch({
      type: "ACTOR_DETAILS_SUCCESS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "ACTOR_DETAILS_FAILED",
    });
    console.log(err.message);
  }
};
