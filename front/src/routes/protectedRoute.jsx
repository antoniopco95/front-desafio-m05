import React from 'react';
import { Navigate } from 'react-router-dom';
import { getItem } from '../utils/storage';

function ProtectedRoute({ element }) {

    const isAuthenticated = !!getItem('token')

    if (!isAuthenticated) {

        return <Navigate to="/" />;
    }


    return element;
}

export default ProtectedRoute;
