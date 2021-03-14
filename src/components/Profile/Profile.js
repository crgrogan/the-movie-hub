import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";

import "./Profile.scss";
import Card from "../Card/Card";
import defaultPoster from "../../images/default-poster.jpg";
import { deleteSession } from "../../actions/authActions";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState("favourites");
  const {
    userInfo,
    isLoading,
    favouritesList,
    ratedList,
    watchlist,
  } = useSelector((state) => state.user);
  const { sessionId } = useSelector((state) => state.session);

  const changeList = (e, category) => {
    const activeItem = document.querySelectorAll(".active-nav-item");
    activeItem[0].classList.remove("active-nav-item");
    e.target.classList.add("active-nav-item");
    setActiveTab(category);
  };

  const handleLogout = () => {
    dispatch(deleteSession(sessionId, history));
  };

  return (
    <section className="profile-container">
      {isLoading ? (
        <div className="loader-container">
          <Loader type="Puff" color="#faed26" height={100} width={100} />
        </div>
      ) : (
        <>
          <section className="profile-header">
            <div className="profile-banner">
              {/* <div className="profile-avatar">
                <span>
                  {userInfo.username && userInfo.username[0].toUpperCase()}
                </span>
              </div> */}
              <div className="username-container">
                <h1 className="profile-username">{userInfo.username}</h1>
                <div className="profile-logout-container">
                  <button className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
              <div className="profile-info">
                <div className="list-count">
                  <span className="list-count-bubble">
                    {favouritesList.total_results}
                  </span>
                  <span className="list-count-title">Favourites</span>
                </div>
                <div className="list-count">
                  <span className="list-count-bubble">
                    {ratedList.total_results}
                  </span>
                  <span className="list-count-title">Ratings</span>
                </div>
                <div className="list-count">
                  <span className="list-count-bubble">
                    {watchlist.total_results}
                  </span>
                  <span className="list-count-title">Watchlist</span>
                </div>
              </div>
              {/* <div className="profile-logout-container">
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div> */}
            </div>
            <div className="profile-navbar">
              <ul>
                <li
                  className="active-nav-item"
                  onClick={(e) => changeList(e, "favourites")}
                >
                  Favourites
                </li>
                <li
                  className="ratings-li"
                  onClick={(e) => changeList(e, "ratings")}
                >
                  Ratings
                </li>
                <li onClick={(e) => changeList(e, "watchlist")}>Watchlist</li>
              </ul>
            </div>
          </section>
          <section className="profile-lists">
            {activeTab === "favourites" && (
              <>
                <h1 className="list-heading">My Favourites</h1>
                <Card list={favouritesList.results} />
              </>
            )}
            {activeTab === "ratings" && (
              <>
                <h1 className="list-heading">My Ratings</h1>
                <Card list={ratedList.results} />
              </>
            )}
            {activeTab === "watchlist" && (
              <>
                <h1 className="list-heading">My Watchlist</h1>
                <Card list={watchlist.results} />
              </>
            )}
          </section>
        </>
      )}
    </section>
  );
};

export default Profile;
