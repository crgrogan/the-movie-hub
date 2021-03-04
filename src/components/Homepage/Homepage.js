import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";

import "./Homepage.scss";
import { getSession } from "../../actions/authActions";
import { getMovieCategories } from "../../actions/movieActions";
import Banner from "../Banner/Banner";
import Carousel from "../Carousel/Carousel";
import { useComponentWillMount } from "../../customHooks";

const Homepage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoggedIn, isLoading: userLoading } = useSelector(
    (state) => state.user
  );
  const {
    nowPlaying,
    upcoming,
    topRated,
    popular,
    isLoading: moviesLoading,
  } = useSelector((state) => state.categories);

  useComponentWillMount(() => {
    dispatch(getMovieCategories());
    if (!isLoggedIn && location.search.split("approved=")[1] === "true") {
      const token = location.search.split("?request_token=")[1].split("&")[0];
      dispatch(getSession(token));
    }
  });

  return (
    <section className="homepage-container">
      {moviesLoading ? (
        <div className="loader-container">
          <Loader type="Puff" color="#faed26" height={100} width={100} />
        </div>
      ) : (
        <>
          <section>
            <Banner moviesList={nowPlaying} />
          </section>
          <section className="sliders">
            <Carousel title="Now-Playing" moviesList={nowPlaying} />
            <Carousel title="Upcoming" moviesList={upcoming} />
            <Carousel title="Top-Rated" moviesList={topRated} />
            <Carousel title="Popular" moviesList={popular} />
          </section>
        </>
      )}
    </section>
  );
};

export default Homepage;
