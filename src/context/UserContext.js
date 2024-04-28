import React, { createContext, useState, useEffect, useRef } from "react";

// Define the UserContext
export const UserContext = createContext(null);

// Define the UserContextProvider component
export const UserContextProvider = ({ children }) => {
  // Initial state of the user
  const initialUserState = {
    id: null,
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    token: ''
  };

  // State for user
  const [user, setUser] = useState(initialUserState);
  // Reference for the timeout ID
  const logoutTimeoutRef = useRef(null);

  // Function to reset user state
  const resetUser = () => {
    setUser(initialUserState);
    // Clear user data from local storage
    localStorage.removeItem('user');
  };

  // Save user data and timestamp to local storage
  const saveUserToLocalStorage = (userData) => {
    const userWithTimestamp = {
      ...userData,
      timestamp: Date.now(),
    };
    localStorage.setItem('user', JSON.stringify(userWithTimestamp));
    // Set up the timeout for automatic logout
    setLogoutTimeout(60 * 60 * 1000);
  };

  // Load user data from local storage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('user');

    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      const { timestamp, ...userData } = parsedData;
      const currentTime = Date.now();

      // Check if the stored data is less than 1 hour old
      const timePassed = currentTime - timestamp;
      if (timePassed < 60 * 60 * 1000) {
        setUser(userData);
        // Set up the timeout for automatic logout
        setLogoutTimeout(60 * 60 * 1000 - timePassed);
      } else {
        // Data is outdated, clear the data and reset user state
        localStorage.removeItem('user');
        resetUser();
      }
    }
  }, []);

  // Whenever user state changes, save to local storage
  useEffect(() => {
    if (user && user.id) {
      saveUserToLocalStorage(user);
    }
  }, [user]);

  // Function to set up the timeout for automatic logout
  const setLogoutTimeout = (timeoutDuration) => {
    // Clear any existing timeout
    clearTimeout(logoutTimeoutRef.current);
    // Set a new timeout for automatic logout after the specified duration
    logoutTimeoutRef.current = setTimeout(resetUser, timeoutDuration);
  };

  // Clean up the timeout when the component unmounts
  useEffect(() => {
    return () => {
      clearTimeout(logoutTimeoutRef.current);
    };
  }, []);

  // Return the context provider
  return (
    <UserContext.Provider value={{ user, setUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};
