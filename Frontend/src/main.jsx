import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { UserContextProvider } from "./util/UserContext.jsx";

// Dynamically setting the backend URL based on environment
axios.defaults.baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000" // Local dev server
    : import.meta.env.VITE_SERVER_URL || "https://skillcrafter.onrender.com"; // Production server

axios.defaults.withCredentials = true;

console.log("Backend API Base URL:", axios.defaults.baseURL);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Router>
);
