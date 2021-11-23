import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route></Route>
          <Home />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
