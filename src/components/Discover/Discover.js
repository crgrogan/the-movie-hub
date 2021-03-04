import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";

import "./Discover.scss";
import defaultPoster from "../../images/default-poster.jpg";
import { getGenre } from "../../utils";
import { useComponentWillMount } from "../../customHooks";

const Discover = () => {
  const history = useHistory();
  const location = useLocation();
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
  const { genresList } = useSelector((state) => state.genres);
  const [discoverResults, setDiscoverResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [voteAverage, setVoteAverage] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  const [displayNavigation, setDisplayNavigation] = useState(true);

  const getDiscoverResults = (filters) => {
    return axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${filters.sortBy}&include_adult=false&include_video=false&page=${filters.page}&year=${filters.year}&vote_average.gte=${filters.voteAverage}&with_genres=${filters.genre}`
    );
  };

  // change discoverResults from discoverRes.data.results to discoverRes.data
  // replace discoverResults with discoverResults.results
  // use discoverRes.total_pages to check total max pages

  useComponentWillMount(async () => {
    if (location.search) {
      let params = new URLSearchParams(location.search);
      let page = params.get("page");
      let sortBy = params.get("sort_by");
      let year = params.get("year");
      let voteAverage = params.get("vote_average.gte");
      let genre = params.get("with_genres");
      let discoverRes = await getDiscoverResults({
        page,
        sortBy,
        year,
        voteAverage,
        genre,
      });
      setDiscoverResults(discoverRes.data);
      setPage(Number(page));
      setLoading(false);
    } else {
      let discoverRes = await getDiscoverResults({
        page,
        sortBy,
        year,
        voteAverage,
        genre,
      });
      setDiscoverResults(discoverRes.data);
      setDisplayNavigation(false);
      setLoading(false);
    }
  });

  useEffect(() => {
    if (!genre) {
      document.querySelector(".genreDropdown").classList.add("grayFont");
    } else {
      document.querySelector(".genreDropdown").classList.remove("grayFont");
    }
  }, [genre]);

  const changePage = async (direction) => {
    window.scrollTo(0, 0);
    if (direction === "next") {
      if (page + 1 > discoverResults.total_pages) return;
      setPage((prevPage) => prevPage + 1);
      let discoverRes = await getDiscoverResults({
        page: page + 1,
        sortBy,
        year,
        voteAverage,
        genre,
      });
      setDiscoverResults(discoverRes.data);
      history.push(
        `/discover/filter?page=${
          page + 1
        }&sort_by=${sortBy}&year=${year}&vote_average.gte=${voteAverage}&with_genres=${genre}`
      );
    } else {
      setPage((prevPage) => prevPage - 1);
      let discoverRes = await getDiscoverResults({
        page: page - 1,
        sortBy,
        year,
        voteAverage,
        genre,
      });
      setDiscoverResults(discoverRes.data);
      history.push(
        `/discover/filter?page=${
          page - 1
        }&sort_by=${sortBy}&year=${year}&vote_average.gte=${voteAverage}&with_genres=${genre}`
      );
    }
  };

  const submitDiscoverForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPage(1);
    let discoverRes = await getDiscoverResults({
      page: 1,
      sortBy,
      year,
      voteAverage,
      genre,
    });
    console.log(discoverRes.data);
    setDiscoverResults(discoverRes.data);
    setDisplayNavigation(true);
    setLoading(false);
    history.push(
      `/discover/filter?page=1&sort_by=${sortBy}&year=${year}&vote_average.gte=${voteAverage}&with_genres=${genre}`
    );
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
        {loading ? (
          <div className="loader-container">
            <Loader type="Puff" color="#faed26" height={100} width={100} />
          </div>
        ) : (
          <>
            {discoverResults.results.length > 0 ? (
              <>
                <ul className="discover-results-list">
                  {discoverResults.results.map((result) => (
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
          </>
        )}
      </section>
    </div>
  );
};

export default Discover;
