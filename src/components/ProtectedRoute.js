import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasRole } from '../utils/permissions';

function ProtectedRoute({ children, allowedRoles }) {

  if (!hasRole(allowedRoles)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
