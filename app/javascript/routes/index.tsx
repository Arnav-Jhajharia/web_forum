import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import SetupPreferences from "../pages/Preferences";
import SettingsPage from "../pages/Settings";

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

      <Route
        path="/preferences"
        element={token ? <SetupPreferences /> : <Navigate to="/login" />}
      />

      {/* Protected Home route */}
      <Route
        path="/"
        element={token ? <Home logout = {logout} /> : <Navigate to="/login" />}
      />


      {/* Settings Route */}
      <Route
        path="/settings"
        element={token ? <SettingsPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;
