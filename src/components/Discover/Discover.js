import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Discover.scss";
import defaultPoster from "../../images/default-poster.jpg";
import { getGenre } from "../../utils";

const Browse = () => {
  const sortOptions = [
    { "Popularity Descending": "popularity.desc" },
    { "Popularity Ascending": "popularity.asc" },
    { "Release Date Descending": "release_date.desc" },
    { "Release Date Ascending": "release_date.asc" },
    { "Revenue Descending": "revenue.desc" },
    { "Revenue Ascending": "revenue.asc" },
    { "Movie Title Ascending": "original_title.asc" },
    { "Movie Title Descending": "original_title.desc" },
    { "Average Rating Ascending": "vote_average.asc" },
    { "Average Rating Descending": "vote_average.desc" },
    { "No. of Ratings Ascending": "vote_count.asc" },
    { "No. of Ratings Descending": "vote_count.desc" },
  ];
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [voteAverage, setVoteAverage] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [discoverResults, setDiscoverResults] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [page, setPage] = useState(1);
  const [displayNavigation, setDisplayNavigation] = useState(false);

  useEffect(async () => {
    let genresRes = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    );
    setGenresList(genresRes.data.genres);
    let nowPlaying = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
    );
    setDiscoverResults(nowPlaying.data.results);
  }, []);

  useEffect(() => {
    if (!genre) {
      document.querySelector(".genreDropdown").classList.add("grayFont");
    } else {
      document.querySelector(".genreDropdown").classList.remove("grayFont");
    }
  }, [genre]);

  const changePage = async (direction) => {
    let res;
    if (direction === "next") {
      setPage((prevPage) => prevPage + 1);
      res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${
          page + 1
        }&year=${year}&vote_average.gte=${voteAverage}&with_genres=${genre}`
      );
    } else {
      setPage((prevPage) => prevPage - 1);
      res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${
          page - 1
        }&year=${year}&vote_average.gte=${voteAverage}&with_genres=${genre}`
      );
    }
    setDiscoverResults(res.data.results);
    window.scrollTo(0, 0);
  };

  const submitDiscoverForm = async (e) => {
    e.preventDefault();
    setPage(1);
    let res = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&year=${year}&vote_average.gte=${voteAverage}&with_genres=${genre}`
    );
    setDiscoverResults(res.data.results);
    setDisplayNavigation(true);
  };

  return (
    <div className="discover-container">
      <h1>Discover</h1>
      <form className="discovery-form" onSubmit={submitDiscoverForm}>
        <div className="discover-filters">
          <select
            value={sortBy}
            type="text"
            onChange={(e) => setSortBy(e.target.value)}
          >
            {sortOptions.map((sortOption) => (
              <option
                key={Object.values(sortOption)}
                value={Object.values(sortOption)}
              >
                {Object.keys(sortOption)}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={voteAverage}
            onChange={(e) => setVoteAverage(e.target.value)}
            placeholder="Average Rating"
            max="10"
            min="0"
            onInput={(e) => (e.target.value = e.target.value.slice(0, 2))}
          />
          <select
            type="text"
            onChange={(e) => setGenre(e.target.value)}
            className="genreDropdown"
          >
            <option style={{ color: "gray" }} value="">
              Select Genre
            </option>
            {genresList.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            max="2028"
            min="1885"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            onInput={(e) => (e.target.value = e.target.value.slice(0, 4))}
          />
        </div>
        <button>Search</button>
      </form>
      <section className="discover-results">
        {discoverResults.length > 0 ? (
          <>
            <ul className="discover-results-list">
              {discoverResults.map((result) => (
                <li key={result.id} className="discover-results-item">
                  <Link to={`/movies/${result.id}`}>
                    <img
                      src={
                        result.poster_path
                          ? `https://image.tmdb.org/t/p/w185/${result.poster_path}`
                          : defaultPoster
                      }
                      alt="Poster for movie"
                    />
                    <h3 className="discover-results-item-title">
                      {result.title}
                    </h3>
                    <p className="discover-results-item-genre">
                      {result.genre_ids &&
                        getGenre(result.genre_ids[0], genresList)}
                    </p>
                    {result.vote_count !== 0 ? (
                      <span className="discover-results-item-rating">
                        {result.vote_average} <i className="fa fa-star"></i>
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
            {displayNavigation && (
              <div className="discover-page-navigation">
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
            )}
          </>
        ) : (
          <h2>No Results to Display</h2>
        )}
      </section>
    </div>
  );
};

export default Browse;
