import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Theme
import theme from './theme';

// Components
import ErrorBoundary from './utils/ErrorBoundary';
import NavBar from './components/NavBar';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Dashboard from './components/Dashboard';
import ProfileSettings from './components/ProfileSettings';
import AddRelationship from './components/Relationships/AddRelationship';
import EditRelationship from './components/Relationships/EditRelationship';
import RelationshipList from './components/Relationships/RelationshipList';
import AIInsights from './components/Insights/AIInsights';
import CompatibilityTest from './components/Compatibility/CompatibilityTest';
import RelationshipReport from './components/Reports/RelationshipReport';
import GoalTracker from './components/Goals/GoalTracker';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar />
            <main style={{ flexGrow: 1, padding: '24px', backgroundColor: '#f5f5f5' }}>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfileSettings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/relationships"
                  element={
                    <ProtectedRoute>
                      <RelationshipList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/relationships/add"
                  element={
                    <ProtectedRoute>
                      <AddRelationship />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/relationships/edit/:id"
                  element={
                    <ProtectedRoute>
                      <EditRelationship />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/insights"
                  element={
                    <ProtectedRoute>
                      <AIInsights />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/compatibility"
                  element={
                    <ProtectedRoute>
                      <CompatibilityTest />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute>
                      <RelationshipReport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/goals"
                  element={
                    <ProtectedRoute>
                      <GoalTracker />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ErrorBoundary>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  );
}

export default App;
