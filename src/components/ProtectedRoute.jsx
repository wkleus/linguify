import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps any route that requires authentication
// If no user is logged in → redirect to /login
// While auth state is still loading → render nothing to avoid flash of login page for already-authenticated users
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute:", { user, loading });

  // Still checking the session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // Not logged in → redirect to login and save the current path
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // User is authenticated → render the protected page
  return children;
}
