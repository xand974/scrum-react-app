import "./app.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoutes from "./pages/privateRoutes/PrivateRoutes";
import Login from "./pages/login/Login";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Loading from "./components/loading/Loading";
import Sprint from "./pages/sprint/Sprint";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setLoggedIn(true);
          setIsLoading(true);
        } else {
          setLoggedIn(false);
          setIsLoading(true);
        }
      },
      (err) => alert(err)
    );
    return unsubscribed;
  }, []);

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={loggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          />
          <Route
            path="/sprint/:id"
            element={
              <PrivateRoutes>
                <Sprint />
              </PrivateRoutes>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
