import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./Navbar.scss";
import logo from "../../images/main-logo.png";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const submitQuery = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/search",
      search: `?q=${query}`,
    });
    return setQuery("");
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="The Movie Hub Logo" />
      </Link>
      <form className="search-container" onSubmit={submitQuery}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
        <Link to="/discover">
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
