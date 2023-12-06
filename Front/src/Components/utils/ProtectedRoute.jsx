import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotFound from '../../Routes/NotFound';

const ProtectedRoute = ({ children, onlyAdmin }) => {
  const isAuthenticated = Boolean(localStorage.getItem('userData')); 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ fromProtectedRoute: true }} />;
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
