import React, { useState } from "react";
import axios from "axios";
import { Grid, Typography, TextField, Button, Box } from "@mui/material";

interface LoginProps {
  setToken: (token: string) => void;
}

const LoginPage: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("/api/v1/auth/login", { username });
      const token = response.data.token;

      localStorage.setItem("token", token);
      setToken(token);

      alert(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Section: Logo */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box textAlign="center">
          <img
            src="/icon.png" // Update with the correct path to your logo
            alt="Penguin Logo"
            style={{ width: "70%", maxWidth: "300px" }}
          />
          <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
            PENGUIN
          </Typography>
        </Box>
      </Grid>

      {/* Right Section: Login Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "400px" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Stay chill
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Join today, or when it feels like it
          </Typography>
          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: "8px",
            }}
          >
            Login
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
