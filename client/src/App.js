import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { NavProvider } from './navContext';
// Import Pages
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Registration from './pages/Registration';
import About from './pages/About';
import Welcome from './pages/Welcome';
import WigSessionSummary from './pages/WigSessionSummary';
import WigSession from './pages/WigSession';
import TeamScoresheet from './pages/TeamScoresheet';
import Account from './pages/Account';
import MemberManagement from './pages/MemberManagement';
import AddWig from './pages/AddWig';
import AddLeadMeasures from './pages/AddLeadMeasures';
import ScoreboardBuilder from './pages/ScoreboardBuilder';
import LeadLagTracker from './pages/LeadLagTracker';
// Import Components
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
// Import context
import { AppProvider, useGlobalContext } from './appContext';

function App() {
  // const { isAdmin } = useGlobalContext();

  return (
    <Router>
      <AppProvider>
        <NavProvider>
          <Navbar />
        </NavProvider>
        <Switch>
          <Route exact path="/"><Redirect to="/login" /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Registration /></Route>
          <Route path="/about"><About /></Route>
          {/* ALL USER Routes - Add ternary: isLoggedIn ? <Page /> : <Login />*/}
          <Route path="/welcome"><Welcome /></Route>
          <Route path="/wig-session-summary"><WigSessionSummary /></Route>
          <Route path="/wig-session"><WigSession /></Route>
          <Route path="/team-scoresheet"><TeamScoresheet /></Route>
          <Route path="/account"><Account /></Route>
          {/* ADMIN Routes - Add ternary: isAdmin ? <Page /> : <Redirect to="/welcome"*/}
          <Route path="/admin/member-management"><MemberManagement /></Route>
          <Route path="/setup/add-wig"><AddWig /></Route>
          <Route path="/setup/add-lead-measures"><AddLeadMeasures /></Route>
          <Route path="/setup/scoreboard-builder"><ScoreboardBuilder /></Route>
          <Route path="/setup/lead-lag-tracker"><LeadLagTracker /></Route>
          {/* 404 */}
          <Route path="*"><NotFound /></Route>
        </Switch>
        <Footer />
      </AppProvider>
    </Router>
  );
}

export default App;
