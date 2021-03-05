import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./Navbar.scss";
import logo from "../../images/main-logo.png";
import { keywordSearch } from "../../actions/movieActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState("");
  const [validationError, setValidationError] = useState(false);
  const history = useHistory();
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    isLoggedIn ? setUsername(userInfo.username) : setUsername("");
  }, [isLoggedIn]);

  useEffect(() => {
    document.addEventListener("click", removeWarning);
  }, [validationError]);

  const removeWarning = () => {
    document.querySelector(".keyword-input").classList.remove("inputError");
    document.removeEventListener("click", removeWarning);
    setValidationError(false);
  };

  const submitQuery = (e) => {
    e.preventDefault();
    if (query.length === 0) {
      document.querySelector(".keyword-input").classList.add("inputError");
      setValidationError(true);
      return;
    } else {
      dispatch(keywordSearch(query, 1));
      setQuery("");
      history.push(`/search?q=${query}&page=1`);
    }
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
            className="keyword-input"
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
      <div className="links">
        <h2>{username}</h2>
        <Link to="/" data-title="Home">
          <i className="fa fa-home"></i>
        </Link>
        <Link to="/profile" data-title="Profile">
          <i className="fa fa-user-circle"></i>
        </Link>
        <Link
          to={
            location.pathname === "/discover" ||
            location.pathname === "/discover/filter"
              ? { pathname: "/discover", refresh: true }
              : { pathname: "/discover" }
          }
          data-title="Discover"
        >
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
