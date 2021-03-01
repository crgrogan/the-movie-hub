import { Link } from "react-router-dom";

import "./Footer.scss";
import githubLogo from "../../images/github-logo.png";
import linkedinLogo from "../../images/linkedin-logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="info">
        <ul>
          <li>
            <h3>The Movie Hub</h3>
          </li>
          <li>Website created by Conor Grogan</li>
          <li>
            <a href="/#">
              Portfolio:{" "}
              <strong className="portfolio">www.conorgrogan.com </strong>
            </a>
          </li>
          <li>
            <a href="https://github.com/">
              <img src={githubLogo} alt="Github Logo" />
            </a>
            <a href="https://linkedin.com">
              <img src={linkedinLogo} alt="LinkedIn Logo" />
            </a>
          </li>
        </ul>
      </div>
      <div className="navigate">
        <div>
          <h3>Sitemap</h3>
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/profile">
              <li>Profile</li>
            </Link>
            <Link to="/browse">
              <li>Browse</li>
            </Link>
          </ul>
        </div>
        <div className="copyright">
          <p>&copy; Copyright 2021 The Movie Hub - All Rights Reserved</p>
        </div>
      </div>
      <div className="endorse">
        <a href="https://www.themoviedb.org/">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
            alt=""
          />
        </a>
        <p className="disclaimer">
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
