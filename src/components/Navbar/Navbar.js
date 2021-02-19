import { Link } from "react-router-dom";

import "./Navbar.scss";
import logo from "../../images/main-logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="" />
      </Link>
      <form className="search-container">
        <div className="search">
          <input type="text" placeholder="Search..." name="search" />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
      <div className="links">
        <Link to="/">
          <i className="fa fa-home"></i>
        </Link>
        <Link to="/profile">
          <i className="fa fa-user-circle"></i>
        </Link>
        <Link to="/browse">
          <i className="fa fa-eye"></i>
        </Link>
        <Link to="#" className="menuIcon">
          <i className="fa fa-bars"></i>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
