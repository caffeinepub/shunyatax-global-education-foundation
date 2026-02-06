// localStorage-backed authentication store for non-ICP build
const AUTH_STORAGE_KEY = 'nonicp_auth_session';
const USERS_STORAGE_KEY = 'nonicp_registered_users';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Get registered users from localStorage
function getRegisteredUsers() {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading registered users:', error);
    return [];
  }
}

// Save registered users to localStorage
function saveRegisteredUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving registered users:', error);
  }
}

// Get current session from localStorage
export function getStoredSession() {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    
    const session = JSON.parse(stored);
    // Validate session structure
    if (session && session.email && session.timestamp) {
      return session;
    }
    return null;
  } catch (error) {
    console.error('Error reading session:', error);
    return null;
  }
}

// Save session to localStorage
function saveSession(email) {
  try {
    const session = {
      email,
      timestamp: Date.now(),
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    return session;
  } catch (error) {
    console.error('Error saving session:', error);
    throw new Error('Failed to save session');
  }
}

// Clear session from localStorage
export function clearSession() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing session:', error);
  }
}

// Register a new user
export function registerUser(email, password, name) {
  // Validate inputs
  if (!email || !password || !name) {
    throw new Error('All fields are required');
  }
  
  if (!EMAIL_REGEX.test(email)) {
    throw new Error('Invalid email format');
  }
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  const users = getRegisteredUsers();
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    throw new Error('Email already registered');
  }
  
  // Add new user (in production, password should be hashed)
  const newUser = {
    email,
    password, // WARNING: In production, this should be hashed
    name,
    createdAt: Date.now(),
  };
  
  users.push(newUser);
  saveRegisteredUsers(users);
  
  return { email, name };
}

// Sign in with credentials
export function signInUser(email, password) {
  // Validate inputs
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  if (!EMAIL_REGEX.test(email)) {
    throw new Error('Invalid email format');
  }
  
  const users = getRegisteredUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  if (user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  // Create session
  const session = saveSession(email);
  
  return {
    email: user.email,
    name: user.name,
    session,
  };
}

// Restore session on app load
export function restoreSession() {
  const session = getStoredSession();
  if (!session) return null;
  
  const users = getRegisteredUsers();
  const user = users.find(u => u.email === session.email);
  
  if (!user) {
    // Session exists but user was deleted
    clearSession();
    return null;
  }
  
  return {
    email: user.email,
    name: user.name,
  };
}

// Sign out
export function signOutUser() {
  clearSession();
}
