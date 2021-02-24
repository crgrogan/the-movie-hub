import { useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import axios from "axios";

import "./SearchResults.scss";
import defaultPoster from "../../images/default-poster.jpg";
import { getGenre } from "../../utils";

const SearchResults = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [genresList, setGenresList] = useState([]);

  useEffect(async () => {
    let genresRes = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    );
    setGenresList(genresRes.data.genres);
  }, []);

  useEffect(async () => {
    let queryString = location.search.split("=")[1];
    setKeyword(queryString);
    let res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${queryString}&page=${page}&include_adult=false`
    );
    setSearchResults(res.data.results);
  }, [page]);

  const changePage = (direction) => {
    if (direction === "next") {
      setPage((prevPage) => prevPage + 1);
    } else {
      setPage((prevPage) => prevPage - 1);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="search-results-container">
      <h1>Search Results for '{keyword}'</h1>
      <ul className="search-results-list">
        {searchResults.map((result) => (
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
              <h3 className="search-results-item-title">{result.title}</h3>
              <p className="search-results-item-genre">
                {result.genre_ids && getGenre(result.genre_ids[0], genresList)}
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
          disabled={page === 1 ? true : false}
          onClick={() => changePage("prev")}
        >
          <i className="fa fa-caret-left"></i>
        </button>
        <span className="page-number">{page}</span>
        <button
          className="page-navigation-btn"
          onClick={() => changePage("next")}
        >
          <i className="fa fa-caret-right"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
