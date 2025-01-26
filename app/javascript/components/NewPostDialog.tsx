import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  InputLabel,
  FormControl,
  Avatar,
  CircularProgress,
  Box
} from '@mui/material';
import { Spa, Mood, Favorite, Psychology, Lightbulb } from '@mui/icons-material';
import axios from 'axios';

const NewPostDialog = ({ open, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    mood: 'chill'
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
    if (open) {
      // Only fetch when the dialog is opened, so data is fresh each time
      fetchData();
    }
  }, [open]);

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
          await axios.post(
            '/api/v1/tags',
            { tag: { name: newTag } },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
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
            tag_list: userTags.join(',')
          }
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('Thread created:', response.data);

      // Close the dialog and reset form on success
      onClose();
      setFormData({
        title: '',
        content: '',
        category_id: '',
        mood: 'chill'
      });
      setUserTags([]);
    } catch (error) {
      console.error('Error creating thread:', error);
      setError(
        'Failed to create thread. Please check your inputs and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Mood options
  const moods = [
    { value: 'chill', icon: <Spa />, color: '#88c0d0' },
    { value: 'excited', icon: <Favorite />, color: '#bf616a' },
    { value: 'curious', icon: <Psychology />, color: '#ebcb8b' },
    { value: 'supportive', icon: <Lightbulb />, color: '#a3be8c' }
  ];

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      // Blurred backdrop
      BackdropProps={{
        style: {
          backdropFilter: 'blur(4px)'
        }
      }}
    >
      {/* “NewPost” at the top */}
      <DialogTitle sx={{ fontWeight: 'bold' }}>New Thread</DialogTitle>

      <DialogContent dividers>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            mt: 1
          }}
        >
          {/* Title Field */}
          <TextField
            fullWidth
            label="Conversation Starter"
            variant="outlined"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          {/* Content Field */}
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Share Your Thoughts"
            variant="outlined"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
          />

          {/* Optional Category Search Bar */}
          {/* <TextField
            fullWidth
            variant="outlined"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /> */}

          {/* Category Selection */}
          <FormControl fullWidth>
            <InputLabel>Choose a Category</InputLabel>
            <Select
              value={formData.category_id}
              onChange={(e) =>
                setFormData({ ...formData, category_id: e.target.value })
              }
              label="Choose a Vibe"
              required
            >
              {filteredCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                      sx={{
                        bgcolor: '#d8dee9',
                        width: 24,
                        height: 24,
                        fontSize: '0.8rem'
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
          />

          {/* Display User Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {userTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                sx={{
                  fontSize: '0.9rem'
                }}
              />
            ))}
          </Box>

          {/* Mood Selection */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Set the Mood
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {moods.map(({ value, icon, color }) => (
                <Button
                  key={value}
                  variant={formData.mood === value ? 'contained' : 'outlined'}
                  onClick={() =>
                    setFormData({ ...formData, mood: value })
                  }
                  sx={{
                    borderColor: color,
                    color: formData.mood === value ? 'white' : color,
                    bgcolor: formData.mood === value ? color : 'transparent',
                    '&:hover': {
                      bgcolor:
                        formData.mood === value ? color : `${color}10`
                    }
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
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between' }}>
        {/* Cancel Button */}
        <Button onClick={onClose} disabled={loading} color="inherit">
          Cancel
        </Button>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            bgcolor: '#88c0d0',
            '&:hover': { bgcolor: '#729cb4' }
          }}
          onClick={handleSubmit} // or ensure the form is submitted
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : (
            'Start the Conversation'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPostDialog;
