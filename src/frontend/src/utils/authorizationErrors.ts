export function normalizeAuthError(error: unknown): string {
  if (!error) return 'An unknown error occurred';
  
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  // Detect common authorization errors from backend traps
  if (errorMessage.includes('Unauthorized')) {
    if (errorMessage.includes('Only admins')) {
      return 'Admin access required. Please contact an administrator to grant you admin privileges.';
    }
    if (errorMessage.includes('Only users')) {
      return 'You must be logged in to perform this action.';
    }
    return 'You do not have permission to perform this action.';
  }
  
  if (errorMessage.includes('Email not registered')) {
    return 'This email has not been registered. An admin must register the email first before you can associate it.';
  }
  
  if (errorMessage.includes('Email already associated')) {
    return 'This email is already associated with another Internet Identity principal.';
  }
  
  if (errorMessage.includes('Email not yet associated')) {
    return 'This email has not been associated with any Internet Identity principal yet. Please associate your email first.';
  }
  
  if (errorMessage.includes('Auth failed')) {
    return 'Authentication failed. The principal does not match the registered email.';
  }

  if (errorMessage.includes('Can only associate your own principal')) {
    return 'You can only associate your own Internet Identity principal with an email.';
  }
  
  return errorMessage;
}

export function isAuthorizationError(error: unknown): boolean {
  if (!error) return false;
  const errorMessage = error instanceof Error ? error.message : String(error);
  return errorMessage.includes('Unauthorized') || 
         errorMessage.includes('permission') ||
         errorMessage.includes('Auth failed') ||
         errorMessage.includes('Email not registered') ||
         errorMessage.includes('Email already associated') ||
         errorMessage.includes('Email not yet associated');
}
