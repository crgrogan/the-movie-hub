import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";

import "./Homepage.scss";
import { getSession } from "../../actions/authActions";
import Banner from "../Banner/Banner";
import Carousel from "../Carousel/Carousel";

const Homepage = () => {
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.user);

  // Get session id from token
  useEffect(() => {
    if (!isLoggedIn && location.search.split("approved=")[1] === "true") {
      const token = location.search.split("?request_token=")[1].split("&")[0];
      dispatch(getSession(token));
    }
  }, []);

  return (
    <section className="homepage-container">
      {isLoading ? (
        <div className="loader-container">
          <Loader type="Puff" color="#faed26" height={100} width={100} />
        </div>
      ) : (
        <>
          <section>
            <Banner />
          </section>
          <section className="sliders">
            <Carousel category="now_playing" />
            <Carousel category="upcoming" />
            <Carousel category="top_rated" />
            <Carousel category="popular" />
          </section>
        </>
      )}
    </section>
  );
};

export default Homepage;
