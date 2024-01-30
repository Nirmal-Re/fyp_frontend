import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Auth, Navbar, Dashboard, Journal, Workouts } from "./components/";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div style={{ marginTop: "64px" }} />
        <Routes>
          <Route path="/login" element={<Auth isSignupValue={false} />} />
          <Route path="/signup" element={<Auth isSignupValue={true} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
