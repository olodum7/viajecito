import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('userData')); 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ fromProtectedRoute: true }} />;
  }

  return children;
};

export default ProtectedRoute;
