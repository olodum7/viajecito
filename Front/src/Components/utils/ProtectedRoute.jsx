import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotFound from '../../Routes/NotFound';

const ProtectedRoute = ({ children, onlyAdmin }) => {
  const isAuthenticated = Boolean(localStorage.getItem('userData')); 
  const location = useLocation();
  const currentPath = location.pathname;
  const isReservationDetailRoute = currentPath === '/reserve';
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

  const userData = JSON.parse(localStorage.getItem('userData'));
  const isAdmin = userData.tipo == "ROLE_ADMIN" ? true : false;

  if (onlyAdmin && !isAdmin) {
    return <NotFound />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.object,
  onlyAdmin: PropTypes.bool
}

export default ProtectedRoute;

