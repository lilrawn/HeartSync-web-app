import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Favorite as HeartIcon,
} from '@mui/icons-material';
import { relationships } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RelationshipList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [relationshipData, setRelationshipData] = useState([]);

  useEffect(() => {
    const fetchRelationships = async () => {
      try {
        const response = await relationships.getAll();
        setRelationshipData(response.data);
      } catch (error) {
        toast.error('Failed to load relationships');
      } finally {
        setLoading(false);
      }
    };

    fetchRelationships();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this relationship?')) {
      try {
        await relationships.delete(id);
        setRelationshipData((prev) => prev.filter((relationship) => relationship.id !== id));
        toast.success('Relationship deleted successfully');
      } catch (error) {
        toast.error('Failed to delete relationship');
      }
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Your Relationships
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/relationships/add')}
          >
            Add Relationship
          </Button>
        </Box>

        <Grid container spacing={3}>
          {relationshipData.map((relationship) => (
            <Grid item xs={12} sm={6} md={4} key={relationship.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={relationship.avatar}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Typography variant="h6">{relationship.name}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {relationship.type}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/relationships/edit/${relationship.id}`)}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(relationship.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default RelationshipList;