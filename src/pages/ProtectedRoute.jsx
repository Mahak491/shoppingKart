import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location, message: 'Please log in to continue.' }} />;
  }

  if (user.email === 'guest@guest.com' && location.pathname === '/checkout') {
    return <Navigate to="/login" replace state={{ from: location, message: 'Guests cannot checkout. Please sign up or log in.' }} />;
  }

  return children;
};

export default ProtectedRoute;
