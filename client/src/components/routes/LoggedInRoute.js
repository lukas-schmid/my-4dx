import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useGlobalContext } from '../../appContext';

export default function LoggedInRoute(props) {
    const { isLoggedIn } = useGlobalContext();

    return (
        <Route path={props.path}>
            { !isLoggedIn &&  <Redirect to="/login" />}
            { isLoggedIn &&  props.children }
        </Route>
    )
}
