import React from 'react';
import {  Navigate, Outlet} from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
// This way of implemented protected routes is inspired by the above.
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {auth} = useAuth()

    return auth ? <Outlet /> : <Navigate to="/" />;

}

export default ProtectedRoute;