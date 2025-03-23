import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  LinearProgress,
  Avatar,
  Chip,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  People as PeopleIcon,
  Psychology as PsychologyIcon,
  TrackChanges as GoalsIcon,
  Favorite as HeartIcon,
  ArrowForward as ArrowForwardIcon,
  TrendingUp as TrendingUpIcon,
  Celebration as CelebrationIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { relationships, goals, insights } from '../services/api';

const StatCard = ({ icon, title, value, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main`, mr: 2 }}>
          {icon}
        </Avatar>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRelationships: 0,
    activeGoals: 0,
    insightsGenerated: 0,
  });
  const [recentRelationships, setRecentRelationships] = useState([]);
  const [upcomingGoals, setUpcomingGoals] = useState([]);
  const [latestInsights, setLatestInsights] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [relationshipsData, goalsData, insightsData] = await Promise.all([
          relationships.getAll(),
          goals.getAll(),
          insights.getInsights(),
        ]);

        setStats({
          totalRelationships: relationshipsData.data.length,
          activeGoals: goalsData.data.filter(goal => !goal.completed).length,
          insightsGenerated: insightsData.data.length,
        });

        setRecentRelationships(relationshipsData.data.slice(0, 3));
        setUpcomingGoals(goalsData.data.filter(goal => !goal.completed).slice(0, 3));
        setLatestInsights(insightsData.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {localStorage.getItem('userName')}!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here's an overview of your relationship journey
        </Typography>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<PeopleIcon />}
            title="Relationships"
            value={stats.totalRelationships}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<GoalsIcon />}
            title="Active Goals"
            value={stats.activeGoals}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<PsychologyIcon />}
            title="Insights Generated"
            value={stats.insightsGenerated}
            color="info"
          />
        </Grid>
      </Grid>

      {/* Recent Relationships */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Recent Relationships</Typography>
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/relationships')}
          >
            View All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {recentRelationships.map((relationship) => (
            <Grid item xs={12} md={4} key={relationship.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={relationship.avatar}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6">{relationship.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {relationship.type}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<HeartIcon />}
                      label={relationship.status}
                      size="small"
                      color="primary"
                    />
                    <Chip
                      icon={<TrendingUpIcon />}
                      label={`${relationship.healthScore}% Health`}
                      size="small"
                      color="success"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/relationships/edit/${relationship.id}`)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Upcoming Goals */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Upcoming Goals</Typography>
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/goals')}
          >
            View All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {upcomingGoals.map((goal) => (
            <Grid item xs={12} md={4} key={goal.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.success.light,
                        color: theme.palette.success.main,
                        mr: 2,
                      }}
                    >
                      <GoalsIcon />
                    </Avatar>
                    <Typography variant="h6">{goal.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {goal.description}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={goal.progress}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Progress: {goal.progress}%
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate('/goals')}
                  >
                    Update Progress
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Latest Insights */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Latest Insights</Typography>
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/insights')}
          >
            View All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {latestInsights.map((insight) => (
            <Grid item xs={12} md={4} key={insight.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.info.light,
                        color: theme.palette.info.main,
                        mr: 2,
                      }}
                    >
                      <PsychologyIcon />
                    </Avatar>
                    <Typography variant="h6">{insight.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {insight.summary}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      icon={<CelebrationIcon />}
                      label={insight.category}
                      size="small"
                      color="primary"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate('/insights')}
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;