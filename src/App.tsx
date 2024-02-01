import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";

import {
  Auth,
  Navbar,
  Dashboard,
  Journal,
  Workouts,
  Home,
} from "./components/";
import { fetchFromAPI } from "./utils/apiRequests";
import "./App.css";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState<boolean | undefined>();
  useEffect(() => {
    const endPoint = "exercise/get-workouts";
    fetchFromAPI(endPoint)
      .then((result) => {
        setisLoggedIn(true);
      })
      .catch((err) => {
        setisLoggedIn(false);
        console.error(err);
      });
  }, []);

  const handleLogin = () => {
    setisLoggedIn(true);
  };

  const handleLogout = () => {
    setisLoggedIn(false);
  };

  if (isLoggedIn === undefined) return <div>Loading...</div>;

  return (
    <div className="App">
      <Router>
        <Navbar props={{ isLoggedIn, handleLogout }} />
        <div style={{ marginTop: "64px" }} />
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Auth
                  props={{
                    isSignupValue: false,
                    handleLogin: () => handleLogin(),
                  }}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Auth
                  props={{
                    isSignupValue: true,
                    handleLogin: () => handleLogin(),
                  }}
                />
              )
            }
          />
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home />}
          />
          <Route
            path="/dashboard"
            element={!isLoggedIn ? <Navigate to="/" /> : <Dashboard />}
          />
          <Route path="/journal" element={<Journal />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
