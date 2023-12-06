import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('userData'));
  const location = useLocation();

  const currentPath = location.pathname;

  const isReservationDetailRoute = currentPath === '/detailReservation';
  const isFavsRoute = currentPath === '/profile/favs';

  const getRedirectState = () => {
    if (isReservationDetailRoute && !isAuthenticated) {
      return { fromReserve: true };
    } else if (isFavsRoute && !isAuthenticated) {
      return { fromFavButton: true };
    } else {
      return { fromProtectedRoute: true };
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={getRedirectState()} />;
  }

  return children;
};

export default ProtectedRoute;

