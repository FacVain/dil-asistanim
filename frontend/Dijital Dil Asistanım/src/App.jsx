import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./index.css";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import useAuthContext from "./hooks/useAuthContext";
import History from "./pages/History/History";
import HistoryDetailed from "./pages/History/HistoryDetailed";
import Dashboard from "./pages/Dashboard/Dashboard";
import GeneralSidebar from "./components/GeneralSidebar";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className="app">
      <Router>
        {user && <GeneralSidebar />}
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/history"
            element={user ? <History /> : <Navigate to="/login" />}
          />
          <Route
            path="/history/:id"
            element={user ? <HistoryDetailed /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
