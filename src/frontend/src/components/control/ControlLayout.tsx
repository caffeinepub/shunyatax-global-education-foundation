import { Outlet, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Image, 
  Users, 
  Heart,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  Settings
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ControlLayout() {
  const { identity, clear, loginStatus } = useInternetIdentity();
  const { isAuthenticated, isAdmin, isLoading: accessLoading } = useAdminAccess();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoading = loginStatus === 'logging-in' || accessLoading;

  // Redirect unauthenticated users to /admin
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: '/admin' });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = async () => {
    await clear();
    navigate({ to: '/' });
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/control' },
    { icon: Settings, label: 'Site Settings', path: '/control/site-settings' },
    { icon: BookOpen, label: 'Programs', path: '/control/programs' },
    { icon: Calendar, label: 'Events', path: '/control/events' },
    { icon: Image, label: 'Gallery', path: '/control/gallery' },
    { icon: Users, label: 'Team', path: '/control/team' },
    { icon: Heart, label: 'Impact Stories', path: '/control/impact' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show access denied screen for authenticated non-admin users
  if (isAuthenticated && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-destructive/5 via-background to-destructive/10">
        <Card className="w-full max-w-md border-destructive/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription className="text-base">
              You do not have permission to access the Control Panel. Only administrators can access this area.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
              <p className="font-semibold mb-2">Need admin access?</p>
              <p>Contact an existing administrator to grant you admin privileges.</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate({ to: '/' })}
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated || !identity) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <img
              src="/assets/Untitled design (94)-2.png"
              alt="Logo"
              className="h-14 w-auto"
            />
            <span className="text-sm font-bold text-foreground">Control Panel</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-card/95 backdrop-blur-md border-r border-border/50 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/assets/Untitled design (94)-2.png"
                alt="Logo"
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Control Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Shunyatax Foundation</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = window.location.pathname === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary/15 to-accent/15 text-primary shadow-glow'
                      : 'text-muted-foreground hover:bg-accent/5 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-border/50 space-y-3">
            <div className="px-4 py-2 rounded-lg bg-accent/5">
              <p className="text-xs text-muted-foreground">Logged in as</p>
              <p className="text-sm font-medium text-foreground truncate">
                {identity.getPrincipal().toString().slice(0, 20)}...
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-20 lg:pt-0 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
