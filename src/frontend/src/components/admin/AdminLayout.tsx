import { Outlet } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Heart, 
  Calendar,
  DollarSign, 
  Mail, 
  LogOut,
  Menu,
  X,
  Loader2,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { toast } from 'sonner';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { useQueryClient } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdminLayout() {
  const { clear, identity } = useInternetIdentity();
  const { isLoading, isAuthenticated, isAdmin, error } = useAdminAccess();
  const queryClient = useQueryClient();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await clear();
      queryClient.clear();
      toast.success('Logged out successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin-panel/dashboard' },
    { icon: BookOpen, label: 'Programs', path: '/admin-panel/programs' },
    { icon: Calendar, label: 'Events', path: '/admin-panel/events' },
    { icon: Users, label: 'Team', path: '/admin-panel/team' },
    { icon: Heart, label: 'Impact Stories', path: '/admin-panel/impact-stories' },
    { icon: DollarSign, label: 'Donations', path: '/admin-panel/donations' },
    { icon: Mail, label: 'Contact Forms', path: '/admin-panel/contacts' },
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-gradient-mid/5 to-gradient-end/5">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin" />
          <p className="text-lg font-semibold text-gray-900">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Show authentication required
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-gradient-mid/5 to-gradient-end/5">
        <div className="max-w-md w-full space-y-6">
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-lg font-bold">Authentication Required</AlertTitle>
            <AlertDescription className="mt-2">
              You must be logged in with Internet Identity to access the admin panel.
            </AlertDescription>
          </Alert>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => window.location.href = '/admin'}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary via-gradient-mid to-gradient-end"
            >
              Go to Login
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full h-12 text-base font-semibold"
            >
              Back to Website
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show access denied for non-admin users
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-gradient-mid/5 to-gradient-end/5">
        <div className="max-w-md w-full space-y-6">
          <Alert variant="destructive">
            <ShieldAlert className="h-5 w-5" />
            <AlertTitle className="text-lg font-bold">Access Denied</AlertTitle>
            <AlertDescription className="mt-2">
              You are logged in but do not have admin privileges. Please contact an administrator to grant you admin access.
            </AlertDescription>
          </Alert>
          {error && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {error.message}
              </AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => window.location.href = '/admin'}
              className="w-full h-12 text-base font-semibold"
            >
              Request Admin Access
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full h-12 text-base font-semibold"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render admin panel for authenticated admins
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-gradient-mid/5 to-gradient-end/5">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/40 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/a_professional_vector_style_logo_design_Y10xaOEOT32zN1Lvad4GEQ_-removebg-preview.png" 
              alt="Shunyatax Global Education Foundation" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">
                {identity?.getPrincipal().toString().slice(0, 10)}...
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">{item.label}</span>
                  </a>
                );
              })}
              <Button
                variant="outline"
                className="w-full justify-start gap-3 mt-4"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </nav>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white/95 backdrop-blur-sm border-r border-border/40">
          <div className="flex flex-col h-full">
            {/* Logo and Admin Info */}
            <div className="p-6 border-b border-border/40">
              <img 
                src="/assets/a_professional_vector_style_logo_design_Y10xaOEOT32zN1Lvad4GEQ_-removebg-preview.png" 
                alt="Shunyatax Global Education Foundation" 
                className="h-16 w-auto mx-auto mb-4"
              />
              <h1 className="text-xl font-bold text-center text-foreground mb-1">Admin Panel</h1>
              <p className="text-xs text-center text-muted-foreground truncate">
                {identity?.getPrincipal().toString().slice(0, 20)}...
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/10 transition-all duration-300 group"
                  >
                    <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-foreground">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-border/40">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/40"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="container max-w-7xl mx-auto p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
