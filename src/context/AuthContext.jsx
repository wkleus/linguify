import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

// Create context for authentication
const AuthContext = createContext();

/**
 * Custom hook to access authentication state and methods - used inside components wrapped by AuthProvider
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * Manage global user state and Supabase session -> Wraps entire app in main.jsx
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Current logged-in user object
  const [session, setSession] = useState(null); // Full Supabase session
  const [loading, setLoading] = useState(true); // Initial loading state

  useEffect(() => {
    // Get current session on app start
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Subscribe to real-time auth changes (login, logout, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  // Logout function - available everywhere via useAuth()
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth };
