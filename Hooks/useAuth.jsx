import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

import { API_URL } from '@env';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [token, setToken] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoadingInitial(true);
      await getToken();
      await getLocation();
      if (token) {
        await fetchUser();
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
    };

    initializeAuth();
  }, [token]);

  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('jwtToken');
      setToken(storedToken);
    } catch (err) {
      console.error('Error fetching token from storage:', err);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });
      if (!response.ok) {
        setUser(null);
        return;
      }
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
      });
      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        setToken(token);
        await AsyncStorage.setItem('jwtToken', token);
      } else {
        setError(data);
        console.log(data);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (name, email, password, otp) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email: email.toLowerCase().trim(), password, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        setToken(token);
        await AsyncStorage.setItem('jwtToken', token);
      } else {
        setError(data);
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
      setToken(null);
      setUser(null);
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        setLocation(location);
        await AsyncStorage.setItem('prevLocation', JSON.stringify(location));
        setLocationLoaded(true);
      },
      async (error) => {
        console.error('Error fetching location:', error);
        const storedLocation = await AsyncStorage.getItem('prevLocation');
        if (storedLocation) {
          setLocation(JSON.parse(storedLocation));
        }
        setLocationLoaded(true);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    );
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      location,
      locationLoaded,
      handleLogin,
      handleSignup,
      error,
      loadingInitial,
      handleLogOut,
    }),
    [user, loading, error, token, loadingInitial, locationLoaded],
  );

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
