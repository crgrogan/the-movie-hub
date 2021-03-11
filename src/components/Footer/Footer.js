import { Link } from "react-router-dom";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer-main-content">
        <div className="footer-left">
          <h4>Website created by Conor Grogan</h4>
          <h4>
            <a href="https://www.conorgrogan.com">
              Portfolio:{" "}
              <span className="website-link">www.conorgrogan.com</span>
            </a>
          </h4>
          <div>
            <a href="mailto:crgrogan@hotmail.com">
              <i className="fa fa-envelope"></i>
            </a>
            <a href="https://github.com/crgrogan">
              <i className="fa fa-github"></i>
            </a>
            <a href="https://ie.linkedin.com/">
              <i className="fa fa-linkedin"></i>
            </a>
          </div>
        </div>
        <div className="footer-center">
          <h1>The Movie Hub</h1>
          <p className="footer-links">
            <Link to="/">Home</Link> | <Link to="/discover">Discover</Link> |{" "}
            <Link to="/profile">Profile</Link>
          </p>
          <p className="copyright">
            &copy; Copyright 2021 The Movie Hub - All Rights Reserved
          </p>
        </div>
        <div className="footer-right">
          <div className="movieDBLogo">
            <a href="https://www.themoviedb.org/">
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                alt="The Movie DB logo"
              />
            </a>
          </div>
          <p className="disclaimer">
            This product uses the TMDb API but is not endorsed or certified by
            TMDb.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
