import React from "react";
import Navbar from "../components/layout/Navbar";
import { Box, Typography, Container } from "@mui/material";

interface HomePageProps {
  logout: () => void; // Accepts a logout prop
}

const Home: React.FC<HomePageProps> = ({ logout }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div>
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={logout} />
      
      {/* Main Content */}
      <Box
        sx={{
          padding: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)", // Adjust height based on navbar
          backgroundColor: "white",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            align="center"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            Welcome to Penguin Forum
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
