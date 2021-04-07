import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
// Import helpers
import { login, register, getAllWigsByTeamId, getTeamMembers, getUser } from './apiHelper';

const AppContext = React.createContext();

function AppProvider({ children }) {
  // ------- STATE -------
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [error, setError] = useState({isError: false, message: ''});

  const [currentUserInfo, setCurrentUserInfo] = useState({});

  const [wigData, setWigData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  // ------- HOOKS -------
  let history = useHistory();

  // ------- LIFECYCLE METHODS -------


  // ------- STATE MANAGEMENT FUNCTIONS -------
  const logInUser = async (email, password) => {
    try {
      const data = await login({ email, password });
      if (!data.errorCode) {
        setCurrentUserInfo(data);

        setIsLoggedIn(true);
        setIsAdmin(data.isAdmin);
        history.push('/welcome');
      }
    } catch (error) {
        console.error(error);
    }
  }

  const logOutUser = () => {
    setCurrentUserInfo({});
    setTeamData([]);
    setWigData([]);
    setIsAdmin(false);
    setIsLoggedIn(false);
    history.push('/login');
  }

  const createNewTeam = async reqObject => {
    try {
      const data = await register(reqObject);
      if (!data.errorCode) {
        setCurrentUserInfo(data);

        setIsLoggedIn(true);
        setIsAdmin(true);
        history.push('/welcome');
      } else {
        return data;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  const getAndUpdateTeamData = async () => {
    try {
      const response = await getTeamMembers(currentUserInfo.teamId);
      setTeamData(response);
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  const getAndUpdateCurrentUserInfo = async () => {
    try {
      const response = await getUser(currentUserInfo.id);
      setCurrentUserInfo(response);
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  const getAndUpdateWigs = async () => {
    try {
      const response = await getAllWigsByTeamId(currentUserInfo.teamId);
      setWigData(response);
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  // ------- RETURN -------
  return (
    <AppContext.Provider value={{
      isAdmin,
      setIsAdmin,

      isLoggedIn,
      setIsLoggedIn,
      logInUser,

      currentUserInfo,
      setCurrentUserInfo,
      getAndUpdateCurrentUserInfo,
      
      logOutUser,
      createNewTeam,

      wigData,
      setWigData,
      getAndUpdateWigs,

      teamData,
      setTeamData,
      getAndUpdateTeamData
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
