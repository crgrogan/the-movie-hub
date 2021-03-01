import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ScrollRestoration from "react-scroll-restoration";
import Cookie from "js-cookie";

import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Homepage/Homepage";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import ActorDetails from "./components/ActorDetails/ActorDetails";
import SearchResults from "./components/SearchResults/SearchResults";
import Discover from "./components/Discover/Discover";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import { getUser } from "./actions/authActions";

// import { checkCookies } from "./actions/authActions";

function App() {
  const { sessionId } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const { userInfo, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser(sessionId));
  }, []);

  function PrivateRoute({ component: Component, authed, ...rest }) {
    let sessionId = Cookie.get("tmh_session_id");
    return (
      <Route
        {...rest}
        render={(props) =>
          sessionId ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }

  return (
    <Router>
      <ScrollRestoration />
      <div className="container">
        <Navbar />
        <div className="content-wrap">
          <Route path="/" exact component={Homepage} />
          <Route path="/movies/:id" component={MovieDetails} />
          <Route path="/actors/:id" component={ActorDetails} />
          <Route path="/search/:q?" component={SearchResults} />
          <Route path="/discover" component={Discover} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute
            authed={isLoggedIn}
            path="/profile"
            component={Profile}
          />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
