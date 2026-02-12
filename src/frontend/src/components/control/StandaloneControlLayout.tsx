import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Heart, 
  Calendar,
  Image as ImageIcon,
  Menu,
  X,
  LogOut,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { useQueryClient } from '@tanstack/react-query';
import { CANONICAL_LOGO_PATH, CANONICAL_LOGO_ALT } from '@/constants/logo';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Programs', href: '/programs', icon: BookOpen },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Gallery', href: '/gallery', icon: ImageIcon },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Impact Stories', href: '/impact', icon: Heart },
  { name: 'Site Settings', href: '/site-settings', icon: Settings },
];

export default function StandaloneControlLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { clear, identity, isInitializing } = useInternetIdentity();
  const { isAdmin, isLoading: isCheckingAdmin } = useAdminAccess();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  // Show loading state while checking authentication
  if (isInitializing || isCheckingAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-gradient-mid/5 to-gradient-end/5">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading control panel...</p>
        </div>
      </div>
    );
  }

  // Show login required message if not authenticated
  if (!identity) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-gradient-mid/5 to-gradient-end/5">
        <div className="text-center space-y-4 max-w-md p-8">
          <h2 className="text-2xl font-bold">Authentication Required</h2>
          <p className="text-muted-foreground">
            You need to be logged in with Internet Identity to access the control panel.
          </p>
          <Button onClick={() => window.location.href = '/admin'} size="lg">
            Go to Admin Login
          </Button>
        </div>
      </div>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-gradient-mid/5 to-gradient-end/5">
        <div className="text-center space-y-4 max-w-md p-8">
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">
            You don't have admin privileges. Please contact an existing admin to grant you access.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => window.location.href = '/'} variant="outline">
              Go Home
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary/5 via-gradient-mid/5 to-gradient-end/5">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gradient-to-br from-primary via-gradient-mid to-gradient-end text-primary-foreground transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-primary-foreground/10">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={CANONICAL_LOGO_PATH}
                alt={CANONICAL_LOGO_ALT}
                className="h-12 w-auto drop-shadow-lg"
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-primary-foreground/10 [&.active]:bg-primary-foreground/20 [&.active]:shadow-lg"
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="border-t border-primary-foreground/10 p-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex h-20 items-center justify-between border-b bg-white px-6 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <img
            src={CANONICAL_LOGO_PATH}
            alt={CANONICAL_LOGO_ALT}
            className="h-10 w-auto"
          />
          <div className="w-10" /> {/* Spacer for centering */}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
