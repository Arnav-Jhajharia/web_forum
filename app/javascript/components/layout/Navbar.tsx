import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fafafa",
        color: "text.primary",
        borderBottom: "0px solid #ccc",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Side: Logo */}
        <Typography
          variant="h6"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          Penguin
        </Typography>

        {/* Center Links */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            flexGrow: 1,
          }}
        >
          {/* Links (Add when needed) */}
          <Button href="/" color="inherit" sx={{ textTransform: "none" }}>
            Home
          </Button>
          <Button href="/categories" color="inherit" sx={{ textTransform: "none" }}>
            Categories
          </Button>
          <Button href="/tags" color="inherit" sx={{ textTransform: "none" }}>
            Tags
          </Button>
        </Box>

        {/* Right Side: Login/Logout */}
        <Box>
          {isLoggedIn ? (
            <Button
              variant="contained"
              color="error"
              onClick={onLogout}
              sx={{
                textTransform: "none",
                fontSize: "0.9rem",
              }}
            >
              Logout
            </Button>
          ) : (
            <></>
            // Add Login Button when needed
            // <Button
            //   variant="contained"
            //   color="primary"
            //   href="/login"
            //   sx={{
            //     textTransform: "none",
            //     fontSize: "0.9rem",
            //   }}
            // >
            //   Login
            // </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
