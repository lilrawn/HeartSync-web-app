import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Psychology as PsychologyIcon,
  CompareArrows as CompareIcon,
  Assessment as AssessmentIcon,
  TrackChanges as TrackChangesIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  FavoriteRounded as HeartIcon,
} from '@mui/icons-material';
import { auth } from '../services/api';

const NavBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isAuthenticated = localStorage.getItem('token');
  const userInitial = localStorage.getItem('userName')?.charAt(0) || 'U';

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Relationships', icon: <PeopleIcon />, path: '/relationships' },
    { text: 'AI Insights', icon: <PsychologyIcon />, path: '/insights' },
    { text: 'Compatibility', icon: <CompareIcon />, path: '/compatibility' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
    { text: 'Goals', icon: <TrackChangesIcon />, path: '/goals' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    auth.logout();
    handleMenuClose();
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        }}
      >
        <HeartIcon sx={{ mr: 1 }} />
        <Typography variant="h6" noWrap>
          HeartSync
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <HeartIcon sx={{ mr: 1 }} />
            <Typography variant="h6" noWrap component="div">
              HeartSync
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4, flexGrow: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                onClick={() => handleNavigate(item.path)}
                sx={{
                  mx: 1,
                  opacity: location.pathname === item.path ? 1 : 0.8,
                  '&:hover': { opacity: 1 },
                }}
                startIcon={item.icon}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          <Box>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{ padding: 0.5 }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                {userInitial}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Profile Settings</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavBar;