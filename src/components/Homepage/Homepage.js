import Glide from "@glidejs/glide";

import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Carousel from "../Carousel/Carousel";
import Footer from "../Footer";

import "./Homepage.scss";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <section>
        <Banner />
      </section>
      <section className="sliders">
        <Carousel category="now_playing" />
        <Carousel category="upcoming" />
        <Carousel category="top_rated" />
        <Carousel category="popular" />
      </section>
      <Footer />
    </div>
  );
};

export default Homepage;
