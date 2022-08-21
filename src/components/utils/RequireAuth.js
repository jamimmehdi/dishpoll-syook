import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './loginAuth';
import { LOGIN } from '../../routes';

const RequireAuth = ({ children }) => {
    const auth = useAuth();


    if (!auth.user) {
        return <Navigate to={LOGIN} />
    }

    return (children);
}

export default RequireAuth;
