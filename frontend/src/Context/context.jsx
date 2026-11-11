import React, { createContext, useState, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null,
  theme: 'light',
  language: 'bn',
  location: null,
  searchResults: [],
  notifications: [],
  wasteStats: {
    totalRecycled: 0,
    co2Saved: 0,
    points: 0,
    rank: 0
  }
};

// Create context
const AppContext = createContext(initialState);

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
      
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
      
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
      
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
      
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
      
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload
      };
      
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload
      };
      
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.payload
      };
      
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload
      };
      
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
      
    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: []
      };
      
    case 'UPDATE_WASTE_STATS':
      return {
        ...state,
        wasteStats: { ...state.wasteStats, ...action.payload }
      };
      
    default:
      return state;
  }
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [socket, setSocket] = useState(null);

  // Initialize on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            dispatch({ type: 'LOGOUT', payload: 'Token expired' });
          } else {
            // Fetch user data
            await fetchUserData(token);
          }
        } catch (error) {
          dispatch({ type: 'LOGOUT', payload: 'Invalid token' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initAuth();
    getUserLocation();
  }, []);

  // Fetch user data
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: response.data, token }
      });
    } catch (error) {
      dispatch({ type: 'LOGOUT', payload: 'Failed to fetch user' });
    }
  };

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch({
            type: 'SET_LOCATION',
            payload: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data
      });
      
      toast.success('Login successful!');
      return true;
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: error.response?.data?.message || 'Login failed'
      });
      
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      
      toast.success('Registration successful! Please login.');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT', payload: null });
    toast.success('Logged out successfully');
  };

  // Search function
  const search = async (query, filters = {}) => {
    try {
      const response = await axios.get('/api/search', {
        params: { q: query, ...filters }
      });
      
      dispatch({
        type: 'SET_SEARCH_RESULTS',
        payload: response.data
      });
      
      return response.data;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/api/user/profile', profileData, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      
      dispatch({
        type: 'UPDATE_USER',
        payload: response.data
      });
      
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update profile');
      return false;
    }
  };

  // Add notification
  const addNotification = (notification) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: notification
    });
  };

  // Clear notifications
  const clearNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  // Update waste stats
  const updateWasteStats = (stats) => {
    dispatch({
      type: 'UPDATE_WASTE_STATS',
      payload: stats
    });
  };

  // Set theme
  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
    localStorage.setItem('theme', theme);
  };

  // Set language
  const setLanguage = (lang) => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
    localStorage.setItem('language', lang);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        search,
        updateProfile,
        addNotification,
        clearNotifications,
        updateWasteStats,
        setTheme,
        setLanguage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};