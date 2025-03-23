import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  Flag as FlagIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { goals } from '../../services/api';
import { toast } from 'react-toastify';

const GoalTracker = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [goalData, setGoalData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetDate: null,
    category: '',
    progress: 0,
    relationshipId: '',
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await goals.getAll();
      setGoalData(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast.error('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (goal = null) => {
    if (goal) {
      setEditingGoal(goal);
      setFormData({
        title: goal.title,
        description: goal.description,
        targetDate: new Date(goal.targetDate),
        category: goal.category,
        progress: goal.progress,
        relationshipId: goal.relationshipId,
      });
    } else {
      setEditingGoal(null);
      setFormData({
        title: '',
        description: '',
        targetDate: null,
        category: '',
        progress: 0,
        relationshipId: '',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingGoal(null);
    setFormData({
      title: '',
      description: '',
      targetDate: null,
      category: '',
      progress: 0,
      relationshipId: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      targetDate: date,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editingGoal) {
        await goals.update(editingGoal.id, formData);
        toast.success('Goal updated successfully');
      } else {
        await goals.create(formData);
        toast.success('Goal created successfully');
      }
      fetchGoals();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving goal:', error);
      toast.error('Failed to save goal');
    }
  };

  const handleDelete = async (goalId) => {
    try {
      await goals.delete(goalId);
      toast.success('Goal deleted successfully');
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast.error('Failed to delete goal');
    }
  };

  const handleUpdateProgress = async (goalId, newProgress) => {
    try {
      await goals.update(goalId, { progress: newProgress });
      toast.success('Progress updated successfully');
      fetchGoals();
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return theme.palette.success.main;
    if (progress >= 50) return theme.palette.info.main;
    if (progress >= 25) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
            <FlagIcon sx={{ mr: 2, fontSize: 35 }} />
            Goal Tracker
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add New Goal
          </Button>
        </Box>

        <Grid container spacing={3}>
          {goalData.map((goal) => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" gutterBottom>
                      {goal.title}
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(goal)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(goal.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {goal.description}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Target Date: {new Date(goal.targetDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Category: {goal.category}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" gutterBottom>
                      Progress: {goal.progress}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={goal.progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: theme.palette.grey[200],
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          backgroundColor: getProgressColor(goal.progress),
                        },
                      }}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<UpdateIcon />}
                    onClick={() => handleUpdateProgress(goal.id, Math.min(goal.progress + 10, 100))}
                  >
                    Update Progress
                  </Button>
                  {goal.progress === 100 && (
                    <CheckCircleIcon color="success" sx={{ ml: 'auto' }} />
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add/Edit Goal Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editingGoal ? 'Edit Goal' : 'Add New Goal'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Goal Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Target Date"
                      value={formData.targetDate}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth required />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      label="Category"
                    >
                      <MenuItem value="Communication">Communication</MenuItem>
                      <MenuItem value="Quality Time">Quality Time</MenuItem>
                      <MenuItem value="Personal Growth">Personal Growth</MenuItem>
                      <MenuItem value="Shared Activities">Shared Activities</MenuItem>
                      <MenuItem value="Emotional Connection">Emotional Connection</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {editingGoal && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Progress (%)"
                      name="progress"
                      value={formData.progress}
                      onChange={handleChange}
                      InputProps={{
                        inputProps: { min: 0, max: 100 }
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
            >
              {editingGoal ? 'Save Changes' : 'Add Goal'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default GoalTracker;