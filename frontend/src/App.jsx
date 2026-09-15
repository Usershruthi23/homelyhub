import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';

import OwnerDashboard from './pages/OwnerDashboard';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import MyProperties from './pages/MyProperties';
import OwnerBookings from './pages/OwnerBookings';

import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import ManageProperties from './pages/ManageProperties';
import ManageBookings from './pages/ManageBookings';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected User Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />

              {/* Protected Owner Routes */}
              <Route path="/owner" element={<ProtectedRoute allowedRoles={['OWNER', 'ADMIN']}><OwnerDashboard /></ProtectedRoute>} />
              <Route path="/owner/properties" element={<ProtectedRoute allowedRoles={['OWNER', 'ADMIN']}><MyProperties /></ProtectedRoute>} />
              <Route path="/owner/properties/add" element={<ProtectedRoute allowedRoles={['OWNER', 'ADMIN']}><AddProperty /></ProtectedRoute>} />
              <Route path="/owner/properties/edit/:id" element={<ProtectedRoute allowedRoles={['OWNER', 'ADMIN']}><EditProperty /></ProtectedRoute>} />
              <Route path="/owner/bookings" element={<ProtectedRoute allowedRoles={['OWNER', 'ADMIN']}><OwnerBookings /></ProtectedRoute>} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><ManageUsers /></ProtectedRoute>} />
              <Route path="/admin/properties" element={<ProtectedRoute allowedRoles={['ADMIN']}><ManageProperties /></ProtectedRoute>} />
              <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={['ADMIN']}><ManageBookings /></ProtectedRoute>} />

              {/* Fallback Route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
