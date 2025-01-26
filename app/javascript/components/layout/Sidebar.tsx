// src/components/layout/Sidebar.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        // position: 'fixed',
        top: 64,  // Offset for a 64px-tall Navbar. 
        left: 0,
        width: { xs: '60px', sm: '220px' },
        height: 'calc(100vh - 64px)', // Fill the viewport below the Navbar
        bgcolor: '#f8f9fa',
        borderRight: '1px solid #ddd',
        p: 2,
        overflowY: 'auto', // Scroll the sidebar if its content is taller than the viewport
      }}
    >
      {user && (
        <Typography
          variant="h6"
          sx={{ display: { xs: 'none', sm: 'block' }, mb: 2 }}
        >
          Welcome, {user.name || user.username}
        </Typography>
      )}

      {/* Explore Button */}
      <Box sx={{ display: { xs: 'none', sm: 'block' }, mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ExploreIcon />}
          fullWidth
          onClick={() => navigate('/explore')}
          sx={{ justifyContent: 'flex-start' }}
        >
          Explore
        </Button>
      </Box>

      {/* "Your Categories" */}
      {user?.preferences?.categories && user.preferences.categories.length > 0 && (
        <>
          <Typography
            variant="body2"
            sx={{ display: { xs: 'none', sm: 'block' }, mb: 1 }}
          >
            Your Categories
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate('/my_categories')}
            sx={{ justifyContent: 'flex-start' }}
          >
            Manage
          </Button>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
