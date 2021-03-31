import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Import helpers
import { login } from './apiHelper';

const AppContext = React.createContext();

function AppProvider({ children }) {
  // ------- STATE -------
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // ------- HOOKS -------
  let history = useHistory();

  // ------- LIFECYCLE METHODS -------

  // ------- STATE MANAGEMENT FUNCTIONS -------
  const logInUser = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await login({ email, password });
      if (!data.errorCode) {
        setIsLoggedIn(true);
        setIsAdmin(data.isAdmin);
        setIsAdmin(!isAdmin);
        history.push('/welcome');
      }
    } catch (error) {
        console.error(error);
    }
    setIsLoading(false);
  }

  const logOutUser = () => {
    setIsLoggedIn(false);
    history.push('/login');
  }

  // ------- RETURN -------
  return (
    <AppContext.Provider value={{
      isLoading,
      setIsLoading,
      logInUser,
      isLoggedIn,
      logOutUser,
      isAdmin
    }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
