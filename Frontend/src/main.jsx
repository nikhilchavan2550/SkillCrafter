import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { UserContextProvider } from "./util/UserContext.jsx";

// Determine environment mode safely
const ENV_MODE = import.meta.env.MODE || process.env.NODE_ENV || "development";

// Dynamically setting the backend URL
axios.defaults.baseURL =
  ENV_MODE === "development"
    ? "http://localhost:8000" // Local dev server
    : import.meta.env.VITE_SERVER_URL || "https://skillcrafter.onrender.com"; // Production fallback

axios.defaults.withCredentials = true;

console.log("📡 Backend API Base URL:", axios.defaults.baseURL);
console.log("🔄 Running in:", ENV_MODE);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Router>
);
