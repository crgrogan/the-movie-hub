import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Homepage/Homepage";
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/" exact component={Homepage} />
        <Route path="/movies/:id" exact component={MovieDetails} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
