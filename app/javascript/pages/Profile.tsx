import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Tabs,
  Tab,
  Paper,
  Grid,
  Avatar,
  Chip,
  Divider,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Comment as CommentIcon,
  DateRange,
  Favorite,
  Spa
} from '@mui/icons-material';
import Navbar from '../components/layout/Navbar';
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  bio: string;
  created_at: string;
  threads: Array<{
    id: number;
    title: string;
    content: string;
    created_at: string;
  }>;
  comments: Array<{
    id: number;
    content: string;
    created_at: string;
    thread_id: number;
    thread_title: string;
  }>;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/v1/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar isLoggedIn onLogout={() => navigate('/login')} />
      
      <Box sx={{ 
        maxWidth: 1200, 
        mx: 'auto',
        position: 'relative'
      }}>
        {/* Cover Photo */}
        <Box sx={{
          height: 200,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          position: 'relative',
          borderRadius: '0 0 16px 16px'
        }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              border: '4px solid white',
              position: 'absolute',
              bottom: -60,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: theme.palette.primary.main
            }}
          >
            {user?.name?.[0] || user?.username?.[0]}
          </Avatar>
        </Box>

        {/* Profile Content */}
        <Box sx={{ pt: 8, px: 4, pb: 4 }}>
          {/* Profile Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 700,
              mb: 1,
              color: theme.palette.text.primary
            }}>
              {user?.name || user?.username}
            </Typography>
            
            <Chip
              label={`@${user?.username}`}
              variant="outlined"
              sx={{ 
                borderRadius: 4,
                borderColor: theme.palette.divider,
                bgcolor: theme.palette.background.paper
              }}
            />

            <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
              <Grid item>
                <Chip
                  icon={<DateRange fontSize="small" />}
                  label={`Joined ${new Date(user?.created_at || '').toLocaleDateString()}`}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<EditIcon fontSize="small" />}
                  label={`${user?.forum_threads?.length || 0} Threads`}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<CommentIcon fontSize="small" />}
                  label={`${user?.comments?.length || 0} Comments`}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {user?.bio && (
              <Typography variant="body1" sx={{ 
                mt: 3,
                maxWidth: 600,
                mx: 'auto',
                color: theme.palette.text.secondary,
                lineHeight: 1.6
              }}>
                {user.bio}
              </Typography>
            )}
          </Box>

          {/* Content Tabs */}
          <Paper sx={{ 
            mb: 3, 
            borderRadius: 3,
            bgcolor: 'background.paper'
          }}>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab 
                label="Threads" 
                value="posts"
                icon={<EditIcon />}
                iconPosition="start"
                sx={{ py: 2, fontSize: 16 }}
              />
              <Tab 
                label="Comments" 
                value="comments"
                icon={<CommentIcon />}
                iconPosition="start"
                sx={{ py: 2, fontSize: 16 }}
              />
            </Tabs>
          </Paper>

          {/* Content Sections */}
          <Box sx={{ 
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { md: 'repeat(2, 1fr)' },
            '&:hover > :not(:hover)': {
              opacity: 0.8,
              transition: 'opacity 0.3s ease'
            }
          }}>
            {activeTab === 'posts' && user?.forum_threads?.map(thread => (
              <Card
                key={thread.id}
                onClick={() => navigate(`/forum_threads/${thread.id}`)}
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[6]
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    {/* <EditIcon color="primary" fontSize="small" /> */}
                    {thread.title}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ 
                    color: 'text.secondary',
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {thread.content}
                  </Typography>

                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    color: 'text.secondary'
                  }}>
                    <Chip
                      label={new Date(thread.created_at).toLocaleDateString()}
                      size="small"
                      icon={<DateRange fontSize="small" />}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <Favorite fontSize="small" />
                    <Typography variant="body2">{thread.likes_count}</Typography>
                    <Spa fontSize="small" />
                    <Typography variant="body2">{thread.chill_votes_count}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}

            {activeTab === 'comments' && user?.comments?.map(comment => (
              <Card
                key={comment.id}
                onClick={() => navigate(`/forum_threads/${comment.forum_thread_id}`)}
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[6]
                  }
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" sx={{ 
                    color: 'text.secondary',
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <CommentIcon color="action" fontSize="small" />
                    In: {comment.thread_title}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {comment.content}
                  </Typography>

                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    color: 'text.secondary'
                  }}>
                    <Chip
                      label={new Date(comment.created_at).toLocaleDateString()}
                      size="small"
                      icon={<DateRange fontSize="small" />}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Empty States */}
          {activeTab === 'posts' && user?.forum_threads?.length === 0 && (
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              color: 'text.secondary'
            }}>
              <EditIcon sx={{ fontSize: 64, mb: 2 }} />
              <Typography variant="h6">
                No posts created yet
              </Typography>
              <Typography>
                Start sharing your thoughts with the community!
              </Typography>
            </Box>
          )}

          {activeTab === 'comments' && user?.comments?.length === 0 && (
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              color: 'text.secondary'
            }}>
              <CommentIcon sx={{ fontSize: 64, mb: 2 }} />
              <Typography variant="h6">
                No comments yet
              </Typography>
              <Typography>
                Engage with the community by joining conversations
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};


export default ProfilePage;