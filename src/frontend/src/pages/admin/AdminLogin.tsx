import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { useAdminRoleManagement } from '@/hooks/useAdminRoleManagement';
import { normalizeAuthError } from '@/utils/authorizationErrors';
import { Loader2, LogIn, UserPlus, Shield, CheckCircle2 } from 'lucide-react';
import { CANONICAL_LOGO_PATH, CANONICAL_LOGO_ALT } from '@/constants/logo';

type WorkflowStep = 'login' | 'register-email' | 'associate-email' | 'grant-admin' | 'complete';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, identity, loginStatus, isInitializing } = useInternetIdentity();
  const { isAdmin, isLoading: isCheckingAdmin } = useAdminAccess();
  
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('login');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { registerEmail, associateEmail, grantAdminByEmail } = useAdminRoleManagement();

  // Redirect if already admin
  useEffect(() => {
    if (identity && isAdmin && !isCheckingAdmin) {
      navigate({ to: '/admin-panel' });
    }
  }, [identity, isAdmin, isCheckingAdmin, navigate]);

  // Auto-advance workflow after successful login
  useEffect(() => {
    if (identity && currentStep === 'login' && !isAdmin && !isCheckingAdmin) {
      setCurrentStep('register-email');
    }
  }, [identity, currentStep, isAdmin, isCheckingAdmin]);

  const handleLogin = async () => {
    try {
      setError('');
      await login();
    } catch (err: any) {
      setError(err.message || 'Failed to login with Internet Identity');
    }
  };

  const handleRegisterEmail = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    try {
      setError('');
      setSuccessMessage('');
      await registerEmail.mutateAsync(email);
      setSuccessMessage('Email registered successfully!');
      setCurrentStep('associate-email');
    } catch (err: any) {
      setError(normalizeAuthError(err));
    }
  };

  const handleAssociateEmail = async () => {
    if (!identity || !email.trim()) {
      setError('Missing identity or email');
      return;
    }

    try {
      setError('');
      setSuccessMessage('');
      await associateEmail.mutateAsync({ email, principal: identity.getPrincipal() });
      setSuccessMessage('Email associated with your principal!');
      setCurrentStep('grant-admin');
    } catch (err: any) {
      setError(normalizeAuthError(err));
    }
  };

  const handleGrantAdmin = async () => {
    if (!identity || !email.trim()) {
      setError('Missing identity or email');
      return;
    }

    try {
      setError('');
      setSuccessMessage('');
      await grantAdminByEmail.mutateAsync({ email, emailPrincipal: identity.getPrincipal() });
      setSuccessMessage('Admin role granted successfully!');
      setCurrentStep('complete');
      setTimeout(() => {
        navigate({ to: '/admin-panel' });
      }, 2000);
    } catch (err: any) {
      setError(normalizeAuthError(err));
    }
  };

  const isLoading = 
    isInitializing || 
    loginStatus === 'logging-in' || 
    isCheckingAdmin ||
    registerEmail.isPending ||
    associateEmail.isPending ||
    grantAdminByEmail.isPending;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-gradient-mid/5 to-gradient-end/5 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <img
              src={CANONICAL_LOGO_PATH}
              alt={CANONICAL_LOGO_ALT}
              className="h-20 w-auto drop-shadow-xl"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
          <CardDescription>
            {currentStep === 'login' && 'Login with Internet Identity to continue'}
            {currentStep === 'register-email' && 'Step 1: Register your email'}
            {currentStep === 'associate-email' && 'Step 2: Associate email with your principal'}
            {currentStep === 'grant-admin' && 'Step 3: Grant admin role'}
            {currentStep === 'complete' && 'Setup complete!'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {successMessage && (
            <Alert className="border-green-500 bg-green-50 text-green-900">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          {currentStep === 'login' && (
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Login with Internet Identity
                </>
              )}
            </Button>
          )}

          {currentStep === 'register-email' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleRegisterEmail}
                disabled={isLoading || !email.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register Email
                  </>
                )}
              </Button>
            </div>
          )}

          {currentStep === 'associate-email' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Email: <strong>{email}</strong>
              </p>
              <Button
                onClick={handleAssociateEmail}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Associating...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Associate Email with Principal
                  </>
                )}
              </Button>
            </div>
          )}

          {currentStep === 'grant-admin' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Email: <strong>{email}</strong>
              </p>
              <Button
                onClick={handleGrantAdmin}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Granting...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Grant Admin Role
                  </>
                )}
              </Button>
            </div>
          )}

          {currentStep === 'complete' && (
            <div className="space-y-4 text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
              <p className="text-lg font-semibold">Admin access granted!</p>
              <p className="text-sm text-muted-foreground">Redirecting to admin panel...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
