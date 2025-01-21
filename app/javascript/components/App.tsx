import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../routes";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from storage
    setToken(null); // Clear the token from state
    alert("You have been logged out.");
  };

  return (
    <Router>
      <AppRoutes token={token} setToken={setToken} logout={handleLogout} />
    </Router>
  );
};

export default App;
