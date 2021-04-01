import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
// Import helpers
import { login, register } from './apiHelper';

const AppContext = React.createContext();

function AppProvider({ children }) {
  // ------- STATE -------
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  const [currentUserInfo, setCurrentUserInfo] = useState({});
  // ------- HOOKS -------
  let history = useHistory();

  // ------- LIFECYCLE METHODS -------

  // ------- STATE MANAGEMENT FUNCTIONS -------
  const logInUser = async (email, password) => {
    console.log('logging in...', email, password)
    setIsLoading(true);
    try {
      const data = await login({ email, password });
      if (!data.errorCode) {
        setCurrentUserInfo(data);

        setIsLoggedIn(true);
        setIsAdmin(data.isAdmin);
        history.push('/welcome');

        console.log(data);
        /* Response:
          companyName: "CH Finance"
          email: "goran@chfinance.org"
          id: "BKUuVcuXO7PUrjlFV08G1bTNVvJ3"
          isAdmin: true
          isLoggedIn: true
          name: "Goran Carlsson"
          scoreboardInclude: true
          teamId: "aceec219-e983-4bfd-979f-118c543720be"
          teamName: "CH Finance Executive Team"
          title: "CEO"
        */
      }
    } catch (error) {
        console.error(error);
    }
    setIsLoading(false);
  }

  const logOutUser = () => {
    setCurrentUserInfo({});
    setIsLoggedIn(false);
    history.push('/login');
  }

  const createNewTeam = async reqObject => {
    setIsLoading(true);
    try {
      const data = await register(reqObject);
      if (!data.errorCode) {
        setIsLoggedIn(true);
        setIsAdmin(true);
        history.push('/welcome');

        console.log(data);

        /* Response:
          companyName: "CH Finance"
          email: "goran@chfinance.org"
          id: "BKUuVcuXO7PUrjlFV08G1bTNVvJ3"
          isAdmin: true
          name: "Goran Carlsson"
          scoreboardInclude: true
          teamId: "aceec219-e983-4bfd-979f-118c543720be"
          teamName: "CH Finance Executive Team"
          title: "CEO"
        */
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  // ------- RETURN -------
  return (
    <AppContext.Provider value={{
      isLoading,
      setIsLoading,
      logInUser,
      isLoggedIn,
      logOutUser,
      isAdmin,
      createNewTeam,
      currentUserInfo
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
