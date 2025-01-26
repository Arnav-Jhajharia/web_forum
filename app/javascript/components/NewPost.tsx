import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  Typography,
  InputLabel,
  FormControl,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { Spa, Mood, Favorite, Psychology, Lightbulb } from '@mui/icons-material';

const NewPostPage = () => {
  const [categories, setCategories] = useState([]);
  const [userTags, setUserTags] = useState([]); // User-defined tags
  const [tagInput, setTagInput] = useState(''); // Input for new tags
  const [searchQuery, setSearchQuery] = useState(''); // Search query for categories
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    mood: 'chill',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await axios.get('/api/v1/categories');
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories. Please try again later.');
      }
    };
    fetchData();
  }, []);

  // Handle tag input
  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  // Add a new tag when Space is pressed
  const handleTagKeyPress = async (e) => {
    if (e.key === ' ' && tagInput.trim() !== '') {
      e.preventDefault();
      const newTag = tagInput.trim();

      try {
        // Check if the tag already exists
        const tagExists = await axios.get(`/api/v1/tags?name=${newTag}`);
        if (!tagExists.data.length) {
          // Create the tag if it doesn't exist
          await axios.post('/api/v1/tags', { tag: { name: newTag } }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        }

        // Add the tag to the list of selected tags
        setUserTags((prev) => [...prev, newTag]);
        setTagInput('');
      } catch (error) {
        console.error('Error creating tag:', error);
        setError('Failed to create tag. Please try again.');
      }
    }
  };

  // Remove a tag
  const handleRemoveTag = (tag) => {
    setUserTags((prev) => prev.filter((t) => t !== tag));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `/api/v1/categories/${formData.category_id}/forum_threads`,
        {
          forum_thread: {
            title: formData.title,
            content: formData.content,
            mood: formData.mood,
            category_id: formData.category_id,
            tag_list: userTags.join(','), // Send tags as a comma-separated string
            
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Thread created:', response.data);
      // Redirect or show success message
      
    } catch (error) {
      console.error('Error creating thread:', error);
      setError('Failed to create thread. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Mood options
  const moods = [
    { value: 'chill', icon: <Spa />, color: '#88c0d0' },
    { value: 'excited', icon: <Favorite />, color: '#bf616a' },
    { value: 'curious', icon: <Psychology />, color: '#ebcb8b' },
    { value: 'supportive', icon: <Lightbulb />, color: '#a3be8c' },
  ];

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        p: 4,
        minHeight: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 400,
          color: '#2e3440',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Mood sx={{ color: '#88c0d0' }} /> Start a New Discussion
      </Typography>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 4,
          p: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
        }}
      >
        {/* Title Field */}
        <TextField
          fullWidth
          label="Conversation Starter"
          variant="outlined"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              fontSize: '1.1rem',
            },
          }}
        />

        {/* Content Field */}
        <TextField
          fullWidth
          multiline
          rows={6}
          label="Share Your Thoughts"
          variant="outlined"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              fontSize: '1rem',
              lineHeight: 1.6,
            },
          }}
        />

        {/* Category Search Bar */}
        {/* <TextField
          fullWidth
          variant="outlined"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            sx: { borderRadius: 2, height: 48 },
          }}
        /> */}

        {/* Category Selection */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Choose a Vibe</InputLabel>
          <Select
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            label="Choose a Vibe"
            required
            sx={{ borderRadius: 2 }}
          >
            {filteredCategories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#d8dee9',
                      width: 24,
                      height: 24,
                      fontSize: '0.8rem',
                    }}
                  >
                    {category.name[0]}
                  </Avatar>
                  {category.name}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Tag Input Field */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a tag and press Space to add..."
          value={tagInput}
          onChange={handleTagInput}
          onKeyPress={handleTagKeyPress}
          sx={{ mb: 3 }}
          InputProps={{
            sx: { borderRadius: 2, height: 48 },
          }}
        />

        {/* Display User Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
          {userTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 4,
                fontSize: '1rem',
                bgcolor: 'primary.main',
                color: 'common.white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </Box>

        {/* Mood Selection */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, color: '#4c566a' }}>
            Set the Mood
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {moods.map(({ value, icon, color }) => (
              <Button
                key={value}
                variant={formData.mood === value ? 'contained' : 'outlined'}
                onClick={() => setFormData({ ...formData, mood: value })}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  textTransform: 'none',
                  borderColor: color,
                  color: formData.mood === value ? 'white' : color,
                  bgcolor: formData.mood === value ? color : 'transparent',
                  '&:hover': {
                    bgcolor: formData.mood === value ? color : `${color}10`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {React.cloneElement(icon, { sx: { fontSize: '1.4rem' } })}
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Box>
              </Button>
            ))}
          </Box>
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            width: '100%',
            py: 2,
            borderRadius: 2,
            fontSize: '1.1rem',
            bgcolor: '#88c0d0',
            '&:hover': { bgcolor: '#729cb4' },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Start the Conversation'}
        </Button>
      </Box>
    </Box>
  );
};

export default NewPostPage;