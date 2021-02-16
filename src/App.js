import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.scss";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <Router>
      <div>
        <Homepage />
      </div>
    </Router>
  );
}

export default App;
