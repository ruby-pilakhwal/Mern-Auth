import React, { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Set axios defaults for credentials
axios.defaults.withCredentials = true;

export const AppContent = createContext();
export const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState({});

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/data');
      if (data.success) {
        setUserData(data.user);
      } else {
        // Don't show error for unauthorized access
        setUserData({});
        setIsLoggedin(false);
      }
    } catch (error) {
      // Don't show error for unauthorized access
      if (error.response?.status === 401) {
        setUserData({});
        setIsLoggedin(false);
      } else {
        toast.error(error.message);
      }
    }
  };

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
      if (data.success) {
        setIsLoggedin(true);
        getUserDetails();
      } else {
        // Don't show error for unauthorized access
        setUserData({});
        setIsLoggedin(false);
      }
    } catch (error) {
      // Don't show error for unauthorized access
      if (error.response?.status === 401) {
        setUserData({});
        setIsLoggedin(false);
      } else {
        toast.error(error.message);
      }
    }
  };

  // Fetch auth state when component mounts
  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserDetails,
    getAuthState
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
