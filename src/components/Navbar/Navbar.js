import { useState, useEffect } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchbarOpen, setSearchbarOpen] = useState(false);
  const history = useHistory();
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    isLoggedIn ? setUsername(userInfo.username) : setUsername("");
  }, [isLoggedIn]);

  /* useEffect(() => {
    document.addEventListener("click", removeWarning);
  }, [validationError]); */

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setSearchbarOpen(!searchbarOpen);
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="The Movie Hub Logo" />
        </Link>
      </div>
      <div
        className={
          searchbarOpen ? "form-container search-open" : "form-container"
        }
      >
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
      </div>
      <ul className={menuOpen ? "nav-links nav-links-open" : "nav-links"}>
        <li>
          <Link to="/" data-title={menuOpen ? null : "Home"}>
            {menuOpen ? <div>Home</div> : <i className="fa fa-home"></i>}
          </Link>
        </li>
        <li className="discover">
          <Link
            to={
              location.pathname === "/discover" ||
              location.pathname === "/discover/filter"
                ? { pathname: "/discover", refresh: true }
                : { pathname: "/discover" }
            }
            data-title={menuOpen ? null : "Discover"}
          >
            {menuOpen ? <div>Discover</div> : <i className="fa fa-eye"></i>}
          </Link>
        </li>
        <li>
          <Link to="/profile" data-title={menuOpen ? null : "Profile"}>
            {menuOpen ? (
              <div>Profile</div>
            ) : (
              <i className="fa fa-user-circle"></i>
            )}
          </Link>
        </li>
        {/* {username && (
          <li>
            <span>{username}</span>
          </li>
        )} */}
      </ul>
      <div className="burger burger-menu">
        <div className={menuOpen ? "hidden" : ""} onClick={toggleMenu}>
          <i className="fa fa-bars"></i>
        </div>
        <div className={menuOpen ? "" : "hidden"} onClick={toggleMenu}>
          <i class="fa fa-times"></i>
        </div>
      </div>
      <div className="burger burger-search">
        <div className={searchbarOpen ? "hidden" : ""} onClick={toggleSearch}>
          <i class="fa fa-search"></i>
        </div>
        <div className={searchbarOpen ? "" : "hidden"} onClick={toggleSearch}>
          <i class="fa fa-times"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
