import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";

interface AppRoutesProps {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ token, setToken, logout }) => {

  return (
    <Routes>
      {/* Redirect to login if no token */}
      <Route
        path="/login"
        element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />}
      />
      {/* Protected Home route */}
      <Route
        path="/"
        element={token ? <Home logout = {logout} /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;
