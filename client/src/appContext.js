import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
// Import helpers
import { login, register, getAllWigsByTeamId, getTeamMembers } from './apiHelper';
// Mock data
import { teamMembersMock } from './assets/mockData';
import { wigDataMock, demoAdminInfoMock, demoUserInfoMock } from './assets/demoMockData';

const AppContext = React.createContext();

function AppProvider({ children }) {
  // ------- STATE -------
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [fetch, setFetch] = useState(false);
  const [error, setError] = useState({isError: false, message: ''});

  const [currentUserInfo, setCurrentUserInfo] = useState({...demoUserInfoMock});

  const [wigData, setWigData] = useState([...wigDataMock]);
  const [userLeadData, setUserLeadDate] = useState([...demoUserInfoMock.leadMeasures]);
  const [userCommitmentData, setUserCommitmentDate] = useState([...demoUserInfoMock.commitments]);
  const [teamData, setTeamData] = useState([...teamMembersMock]);
  // ------- HOOKS -------
  let history = useHistory();

  // ------- LIFECYCLE METHODS -------

  // getAllWigsByTeamId(currentUserInfo.teamId)
  // getTeamMembers(currentUserInfo.teamId)

  // ------- STATE MANAGEMENT FUNCTIONS -------
  const logInUser = async (email, password) => {
    console.log('logging in...', email, password)
    try {
      const data = await login({ email, password });
      if (!data.errorCode) {
        setCurrentUserInfo(data);

        setIsLoggedIn(true);
        setIsAdmin(data.isAdmin);
        history.push('/welcome');

        //console.log(data);
      }

      console.log(data.teamId)

      //getTeamMembers(currentUserInfo.teamId)
      //getAllWigsByTeamId(currentUserInfo.teamId)

      // const team = await getTeamMembers(data.teamId);
      // console.log(team);

      // const wigs = await getAllWigsByTeamId(data.teamId);
      // console.log(wigs);

    } catch (error) {
        console.error(error);
    }
  }

  const logOutUser = () => {
    setCurrentUserInfo({});
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

        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // ------- RETURN -------
  return (
    <AppContext.Provider value={{
      isLoading,
      setIsLoading,

      isAdmin,
      setIsAdmin,

      isLoggedIn,
      setIsLoggedIn,
      logInUser,

      currentUserInfo,
      setCurrentUserInfo,
      
      logOutUser,
      createNewTeam,
      wigData,
      teamData,
      userLeadData,
      userCommitmentData,
      setFetch
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
