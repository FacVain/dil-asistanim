import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import useAuthContext from "./hooks/useAuthContext";
import History from "./pages/History/History";
import HistoryDetailed from "./pages/History/HistoryDetailed";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className="w-screen h-screen bg-white ">
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
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
            element={true ? <History /> : <Navigate to="/login" />}
          />
          <Route
            path="/history/:id"
            element={true ? <HistoryDetailed /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
