import { useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";

import "./SearchResults.scss";
import defaultPoster from "../../images/default-poster.jpg";
import { getGenre } from "../../utils";
import { keywordSearch } from "../../actions/movieActions";
import { useComponentWillMount, useDidMountEffect } from "../../customHooks";

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { queryString, searchResults, page, isLoading } = useSelector(
    (state) => state.keywordQuery
  );
  const [currentPage, setCurrentPage] = useState(() => {
    let str = location.search.split("?q=")[1];
    let pageNumber = Number(str.split("&page=")[1]);
    return pageNumber;
  });
  const [genresList, setGenresList] = useState([]);

  useComponentWillMount(() => {
    if (!isLoading) {
      let str = location.search.split("?q=")[1];
      let query = str.split("&page=")[0];
      let pageNumber = str.split("&page=")[1];
      dispatch(keywordSearch(query, pageNumber));
    }
  });

  useDidMountEffect(() => {
    console.log("changePage");
    setCurrentPage(page);
  }, [page]);

  const changePage = (direction) => {
    if (direction === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
      history.push(`/search?q=${queryString}&page=${currentPage + 1}`);
      dispatch(keywordSearch(queryString, currentPage + 1));
    } else {
      setCurrentPage((prevPage) => prevPage - 1);
      history.push(`/search?q=${queryString}&page=${currentPage - 1}`);
      dispatch(keywordSearch(queryString, currentPage - 1));
    }
  };

  return (
    <div className="search-results-container">
      {isLoading ? (
        <div className="loader-container">
          <Loader type="Puff" color="#faed26" height={100} width={100} />
        </div>
      ) : (
        <>
          <h1>Search Results for '{queryString}'</h1>
          <ul className="search-results-list">
            {searchResults &&
              searchResults.map((result) => (
                <li key={result.id} className="search-results-item">
                  <Link to={`/movies/${result.id}`}>
                    <img
                      src={
                        result.poster_path
                          ? `https://image.tmdb.org/t/p/w185/${result.poster_path}`
                          : defaultPoster
                      }
                      alt="Poster for movie"
                    />
                    <h3 className="search-results-item-title">
                      {result.title}
                    </h3>
                    <p className="search-results-item-genre">
                      {result.genre_ids &&
                        getGenre(result.genre_ids[0], genresList)}
                    </p>
                    {result.vote_count !== 0 ? (
                      <span className="search-results-item-rating">
                        {result.vote_average} <i className="fa fa-star"></i>
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
          </ul>
          <div className="results-page-navigation">
            <button
              className="page-navigation-btn"
              disabled={currentPage === 1 ? true : false}
              onClick={() => changePage("prev")}
            >
              <i className="fa fa-caret-left"></i>
            </button>
            <span className="page-number">{currentPage}</span>
            <button
              className="page-navigation-btn"
              onClick={() => changePage("next")}
            >
              <i className="fa fa-caret-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
