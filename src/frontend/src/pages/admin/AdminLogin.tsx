import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, LogIn, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { useAdminRoleManagement } from '@/hooks/useAdminRoleManagement';
import { normalizeAuthError } from '@/utils/authorizationErrors';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminLogin() {
  const { login, identity, isLoggingIn, isInitializing } = useInternetIdentity();
  const { isAuthenticated, isAdmin, isLoading: accessLoading } = useAdminAccess();
  const { associateEmail } = useAdminRoleManagement();
  
  const [email, setEmail] = useState('');
  const [isAssociating, setIsAssociating] = useState(false);

  // Redirect if already admin
  useEffect(() => {
    if (isAuthenticated && isAdmin && !accessLoading) {
      window.location.href = '/admin-panel/dashboard';
    }
  }, [isAuthenticated, isAdmin, accessLoading]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login error:', error);
      toast.error(normalizeAuthError(error));
    }
  };

  const handleAssociateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!identity) {
      toast.error('Please log in with Internet Identity first');
      return;
    }

    setIsAssociating(true);
    try {
      await associateEmail.mutateAsync({
        email,
        principal: identity.getPrincipal(),
      });
      toast.success('Email associated successfully! An admin can now grant you access.');
      setEmail('');
    } catch (error) {
      console.error('Email association error:', error);
      toast.error(normalizeAuthError(error));
    } finally {
      setIsAssociating(false);
    }
  };

  const isLoading = isInitializing || accessLoading;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-gradient-mid/10 to-gradient-end/10">
      <Card className="w-full max-w-md border-border/50 bg-card/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto mb-4">
            <img 
              src="/assets/a_professional_vector_style_logo_design_Y10xaOEOT32zN1Lvad4GEQ_-removebg-preview.png" 
              alt="Shunyatax Global Education Foundation" 
              className="h-20 w-auto mx-auto"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">Admin Access</CardTitle>
          <CardDescription className="text-base">
            {isAuthenticated 
              ? 'Manage your admin access' 
              : 'Log in with Internet Identity to access the admin panel'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isAuthenticated ? (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You need to authenticate with Internet Identity to access the admin panel.
                </AlertDescription>
              </Alert>
              
              <Button
                onClick={handleLogin}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary via-gradient-mid to-gradient-end hover:shadow-glow-lg transition-all duration-300"
                disabled={isLoggingIn || isLoading}
              >
                {isLoggingIn || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {isLoading ? 'Loading...' : 'Logging in...'}
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Login with Internet Identity
                  </>
                )}
              </Button>
            </>
          ) : !isAdmin ? (
            <>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You are logged in but do not have admin privileges. Associate your email below so an admin can grant you access.
                </AlertDescription>
              </Alert>

              <form onSubmit={handleAssociateEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-semibold">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-border/50 focus:border-primary focus:ring-primary"
                      disabled={isAssociating}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This email will be associated with your current Internet Identity principal.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold"
                  disabled={isAssociating}
                >
                  {isAssociating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Associating...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Associate Email
                    </>
                  )}
                </Button>
              </form>

              <div className="text-sm text-muted-foreground bg-accent/5 p-4 rounded-lg">
                <p className="font-semibold mb-2">Next Steps:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Associate your email with your Internet Identity</li>
                  <li>Contact an existing admin to grant you admin rights</li>
                  <li>Once granted, you'll be able to access the admin panel</li>
                </ol>
              </div>
            </>
          ) : (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                You have admin access. Redirecting to dashboard...
              </AlertDescription>
            </Alert>
          )}

          <div className="text-center pt-4">
            <a 
              href="/" 
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              ← Back to Website
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
