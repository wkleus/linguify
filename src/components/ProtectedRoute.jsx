import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps any route that requires authentication
// If no user is logged in → redirect to /login
// While auth state is still loading → render nothing to avoid flash of login page for already-authenticated users
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute:", { user, loading });

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
