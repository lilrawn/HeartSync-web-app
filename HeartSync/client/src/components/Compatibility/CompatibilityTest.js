import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { compatibility } from '../../services/api';
import { toast } from 'react-toastify';

const CompatibilityTest = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    partner1: {
      name: '',
      age: '',
      interests: '',
    },
    partner2: {
      name: '',
      age: '',
      interests: '',
    },
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [partner, field] = name.split('.');
    setFormData((prev) => ({
      ...prev,
      [partner]: {
        ...prev[partner],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await compatibility.test(formData);
      setResult(response.data);
      toast.success('Compatibility test completed successfully');
    } catch (error) {
      toast.error('Failed to test compatibility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Compatibility Test
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Fill in the details of both partners to test compatibility.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Partner 1</Typography>
              <TextField
                fullWidth
                label="Name"
                name="partner1.name"
                value={formData.partner1.name}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Age"
                name="partner1.age"
                type="number"
                value={formData.partner1.age}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Interests"
                name="partner1.interests"
                value={formData.partner1.interests}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Partner 2</Typography>
              <TextField
                fullWidth
                label="Name"
                name="partner2.name"
                value={formData.partner2.name}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Age"
                name="partner2.age"
                type="number"
                value={formData.partner2.age}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Interests"
                name="partner2.interests"
                value={formData.partner2.interests}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Testing...' : 'Test Compatibility'}
            </Button>
          </Box>
        </form>

        {result && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Compatibility Result</Typography>
            <Alert severity="info">{result.message}</Alert>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default CompatibilityTest;