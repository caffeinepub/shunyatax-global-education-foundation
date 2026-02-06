import React, { createContext, useState, useEffect } from 'react';
import { registerUser, signInUser, signOutUser, restoreSession } from './authStore';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Restore session on mount
  useEffect(() => {
    try {
      const user = restoreSession();
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error restoring session:', error);
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const signUp = async (email, password, name) => {
    try {
      const user = registerUser(email, password, name);
      // Auto sign in after registration
      const signedInUser = await signIn(email, password);
      return signedInUser;
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const user = signInUser(email, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    try {
      signOutUser();
      setCurrentUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    currentUser,
    isInitializing,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
