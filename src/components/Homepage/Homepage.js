import Banner from "../Banner/Banner";
import Carousel from "../Carousel/Carousel";

import "./Homepage.scss";

const Homepage = () => {
  return (
    <div>
      <section>
        <Banner />
      </section>
      <section className="sliders">
        <Carousel category="now_playing" />
        <Carousel category="upcoming" />
        <Carousel category="top_rated" />
        <Carousel category="popular" />
      </section>
    </div>
  );
};

export default Homepage;
