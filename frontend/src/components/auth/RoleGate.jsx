import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const RoleGate = ({ roles = [], children }) => {
  const { token, user } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (roles.length && !roles.some((role) => user?.roles?.includes(role))) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleGate;
