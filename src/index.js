import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18
import App from "./App";
import "./index.css"; // Optional: Your CSS imports
import { AuthProvider } from "./context/AuthContext"; // If using AuthContext

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
