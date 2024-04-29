import React, { createContext, useState, useEffect, useRef } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const initialUserState = {
    id: null,
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    token: ''
  };

  const [user, setUser] = useState(initialUserState);
  const logoutTimeoutRef = useRef(null);

  const resetUser = () => {
    setUser(initialUserState);
    localStorage.removeItem('user');
  };

  const saveUserToLocalStorage = (userData) => {
    const userWithTimestamp = {
      ...userData,
      timestamp: Date.now(),
    };
    localStorage.setItem('user', JSON.stringify(userWithTimestamp));
    setLogoutTimeout(60 * 60 * 1000);
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');

    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      const { timestamp, ...userData } = parsedData;
      const currentTime = Date.now();

      const timePassed = currentTime - timestamp;
      if (timePassed < 60 * 60 * 1000) {
        setUser(userData);
        setLogoutTimeout(60 * 60 * 1000 - timePassed);
      } else {
        localStorage.removeItem('user');
        resetUser();
      }
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      saveUserToLocalStorage(user);
    }
  }, [user]);

  const setLogoutTimeout = (timeoutDuration) => {
    clearTimeout(logoutTimeoutRef.current);
    logoutTimeoutRef.current = setTimeout(resetUser, timeoutDuration);
  };

  useEffect(() => {
    return () => {
      clearTimeout(logoutTimeoutRef.current);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};
