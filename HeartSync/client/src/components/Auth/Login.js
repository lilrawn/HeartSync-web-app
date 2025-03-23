import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Divider } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { googleLogin } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Implement regular email/password login here
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const userData = await googleLogin();
      // Store user data in local storage or context
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Successfully logged in with Google');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          disabled={loading}
          sx={{ mb: 3 }}
        >
          Continue with Google
        </Button>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            Login
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Button color="primary" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;