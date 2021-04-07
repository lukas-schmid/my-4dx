import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { NavProvider } from './navContext';
// Import Pages
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Registration from './pages/Registration';
import Welcome from './pages/Welcome';
import WigSessionSummary from './pages/WigSessionSummary';
import WigSession from './pages/WigSession';
import Account from './pages/Account';
import MemberManagement from './pages/MemberManagement';
import AddWig from './pages/AddWig';
import AddLeadMeasures from './pages/AddLeadMeasures';
import LagTracker from './pages/LagTracker';
// Import Components
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
// Import context
import { AppProvider } from './appContext';
import LoggedInRoute from './components/routes/LoggedInRoute';
import AdminRoute from './components/routes/AdminRoute';
import FormLoaderOverlay from './components/FormLoaderOverlay';

function App() {
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

          {/* isLoggedIn */}
          <LoggedInRoute path="/welcome"><Welcome /></LoggedInRoute>
          <LoggedInRoute path="/wig-session-summary"><WigSessionSummary /></LoggedInRoute>
          <LoggedInRoute path="/wig-session"><WigSession /></LoggedInRoute>
          <LoggedInRoute path="/account"><Account /></LoggedInRoute>

          {/* ADMIN Routes - Add ternary: isAdmin ? <Page /> : <Redirect to="/welcome"*/}
          <AdminRoute path="/admin/member-management"><MemberManagement /></AdminRoute>
          <AdminRoute path="/setup/add-wig"><AddWig /></AdminRoute>
          <AdminRoute path="/setup/add-lead-measures"><AddLeadMeasures /></AdminRoute>
          <AdminRoute path="/setup/lag-tracker"><LagTracker /></AdminRoute>

          {/* 404 */}
          <Route path="*"><NotFound /></Route>
        </Switch>
        <Footer />
      </AppProvider>
    </Router>
  );
}

export default App;
