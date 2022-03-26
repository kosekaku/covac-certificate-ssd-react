import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
//import { Navigate } from 'react-router';

function ProtectedRoute({ element: Component, ...restOfProps }) {
  const tokenStored = JSON.parse(sessionStorage.getItem('token'));

  return tokenStored !== null ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
