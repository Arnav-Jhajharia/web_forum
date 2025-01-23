import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";

interface HomeProps {
  logout: () => void;
}

const Home: React.FC<HomeProps> = ({ logout }) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Chill Forum
        </Typography>
        <Typography variant="body1" gutterBottom>
          You're logged in! Feel free to explore.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={logout}
          sx={{ mt: 4 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
