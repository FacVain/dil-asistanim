import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "antd/dist/reset.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { HistoryProvider } from "./contexts/HistoryContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HistoryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HistoryProvider>
  </React.StrictMode>,
);
