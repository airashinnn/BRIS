import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const isAuthenticated = true; // Replace with real auth
  const userRole = "admin"; // Example: admin, staff, resident

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;