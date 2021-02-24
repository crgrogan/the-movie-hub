import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ScrollRestoration from "react-scroll-restoration";

import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Homepage/Homepage";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import ActorDetails from "./components/ActorDetails/ActorDetails";
import SearchResults from "./components/SearchResults/SearchResults";
import Discover from "./components/Discover/Discover";

function App() {
  return (
    <Router>
      <ScrollRestoration />
      <div>
        <Navbar />
        <Route path="/" exact component={Homepage} />
        <Route path="/movies/:id" component={MovieDetails} />
        <Route path="/actors/:id" component={ActorDetails} />
        <Route path="/search/:q?" component={SearchResults} />
        <Route path="/discover" component={Discover} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
