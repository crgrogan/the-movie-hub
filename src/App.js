import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Homepage/Homepage";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import ActorDetails from "./components/ActorDetails/ActorDetails";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/" exact component={Homepage} />
        <Route path="/movies/:id" component={MovieDetails} />
        <Route path="/actors/:id" component={ActorDetails} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
