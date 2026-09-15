import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('homelyhub_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('homelyhub_token') || null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token: jwtToken, id, name, email: userEmail, role, message } = response.data;
      
      const userData = { id, name, email: userEmail, role };
      
      localStorage.setItem('homelyhub_token', jwtToken);
      localStorage.setItem('homelyhub_user', JSON.stringify(userData));

      setToken(jwtToken);
      setUser(userData);
      return { success: true, message: message || 'Login successful!' };
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data || 'Invalid email or password';
      return { success: false, message: typeof errorMsg === 'string' ? errorMsg : 'Authentication failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, phone, role) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', { name, email, password, phone, role });
      const { token: jwtToken, id, name: userName, email: userEmail, role: userRole, message } = response.data;
      
      const userData = { id, name: userName, email: userEmail, role: userRole };

      localStorage.setItem('homelyhub_token', jwtToken);
      localStorage.setItem('homelyhub_user', JSON.stringify(userData));

      setToken(jwtToken);
      setUser(userData);
      return { success: true, message: message || 'Registration successful!' };
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data || 'Registration failed';
      return { success: false, message: typeof errorMsg === 'string' ? errorMsg : 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('homelyhub_token');
    localStorage.removeItem('homelyhub_user');
    setToken(null);
    setUser(null);
  };

  const updateProfileState = (updatedUser) => {
    const newUserData = { ...user, ...updatedUser };
    localStorage.setItem('homelyhub_user', JSON.stringify(newUserData));
    setUser(newUserData);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfileState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
