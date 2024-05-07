import "./App.css";
import Main from "./Component/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movie from "./Component/Movie";

function App() {
  return (
    <div className="App">
      {/* <Main /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
