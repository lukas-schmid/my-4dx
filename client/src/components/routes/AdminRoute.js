import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useGlobalContext } from '../../appContext';

export default function AdminRoute(props) {
    const { isLoggedIn, isAdmin } = useGlobalContext();

    return (
        <Route path={props.path}>
            {!isLoggedIn && <Redirect to="/login" />}
            {isLoggedIn && isAdmin ? props.children : <Redirect to="/welcome" />}
        </Route>
    )
}

