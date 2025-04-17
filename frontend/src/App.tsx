import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layouts/DashboardLayout';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import Scenarios from './pages/Scenarios';
import Payloads from './pages/Payloads';
import Reports from './pages/Reports';
import Scanner from './pages/Scanner';
import Terminal from './pages/Terminal';
import Settings from './pages/Settings';
import UserManagement from './pages/admin/UserManagement';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes with DashboardLayout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="scenarios" element={<Scenarios />} />
            <Route path="payloads" element={<Payloads />} />
            <Route path="reports" element={<Reports />} />
            <Route path="scanner" element={<Scanner />} />
            <Route path="terminal" element={<Terminal />} />
            <Route path="settings" element={<Settings />} />
            <Route path="admin/users" element={<UserManagement />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App; 