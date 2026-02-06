import { Component, ErrorInfo, ReactNode, Suspense } from 'react';
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import ControlLayout from './components/control/ControlLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import DonatePage from './pages/DonatePage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPrograms from './pages/admin/AdminPrograms';
import AdminTeam from './pages/admin/AdminTeam';
import AdminImpactStories from './pages/admin/AdminImpactStories';
import AdminEvents from './pages/admin/AdminEvents';
import AdminDonations from './pages/admin/AdminDonations';
import AdminContacts from './pages/admin/AdminContacts';
import ControlDashboard from './pages/control/ControlDashboard';
import ControlPrograms from './pages/control/ControlPrograms';
import ControlEvents from './pages/control/ControlEvents';
import ControlGallery from './pages/control/ControlGallery';
import ControlTeam from './pages/control/ControlTeam';
import ControlImpact from './pages/control/ControlImpact';
import ControlSiteSettings from './pages/control/ControlSiteSettings';
import { Toaster } from './components/ui/sonner';
import { AlertCircle, RefreshCw, Home, Loader2 } from 'lucide-react';
import { Button } from './components/ui/button';

// Global Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    console.error('ErrorBoundary: Caught error', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary: Component stack', errorInfo.componentStack);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.href = '/';
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-primary via-gradient-mid to-gradient-end flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative bg-destructive/10 p-6 rounded-full">
                  <AlertCircle className="h-16 w-16 text-destructive" />
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Oops! Something went wrong
                </h1>
                <p className="text-lg text-gray-700 max-w-md mx-auto">
                  We encountered an unexpected error. Don't worry, we're here to help you get back on track.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="w-full bg-gray-50 rounded-lg p-4 text-left">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Error Details:</p>
                  <p className="text-xs text-gray-700 font-mono break-all">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">
                        Stack Trace
                      </summary>
                      <pre className="text-xs text-gray-600 mt-2 overflow-auto max-h-40">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                <Button
                  onClick={this.handleReset}
                  className="group relative overflow-hidden bg-gradient-to-r from-primary via-gradient-mid to-gradient-end text-white hover:shadow-glow-lg transition-all duration-300"
                  size="lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Home className="h-5 w-5 mr-2 relative z-10" />
                  <span className="relative z-10 font-semibold">Go to Homepage</span>
                </Button>
                
                <Button
                  onClick={this.handleReload}
                  variant="outline"
                  className="group relative overflow-hidden border-2 border-gray-900/20 hover:border-gray-900/40 hover:shadow-lg transition-all duration-300"
                  size="lg"
                >
                  <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="font-semibold">Reload Page</span>
                </Button>
              </div>

              <p className="text-sm text-gray-600 pt-4">
                If the problem persists, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Fallback Component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-gradient-end/5">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin" />
        <p className="text-lg font-semibold text-gray-900">Loading...</p>
      </div>
    </div>
  );
}

// Safe Component Wrapper for Routes
function SafeComponent({ component: Component }: { component: React.ComponentType }) {
  try {
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Component />
        </Suspense>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Component render error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-gradient-end/5">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Component Error</h2>
          <p className="text-gray-700">This page failed to load. Please try refreshing.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reload Page
          </Button>
        </div>
      </div>
    );
  }
}

// Root route for public pages with error boundary
const rootRoute = createRootRoute({
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Layout />
      </Suspense>
    </ErrorBoundary>
  ),
  errorComponent: () => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900">Route Error</h2>
        <p className="text-gray-700">Failed to load this route.</p>
        <Button onClick={() => window.location.href = '/'}>
          <Home className="h-4 w-4 mr-2" />
          Go Home
        </Button>
      </div>
    </div>
  ),
});

// Public routes with safe wrappers
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <SafeComponent component={HomePage} />,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => <SafeComponent component={AboutPage} />,
});

const programsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/programs',
  component: () => <SafeComponent component={ProgramsPage} />,
});

const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/events',
  component: () => <SafeComponent component={EventsPage} />,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gallery',
  component: () => <SafeComponent component={GalleryPage} />,
});

const donateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/donate',
  component: () => <SafeComponent component={DonatePage} />,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: () => <SafeComponent component={ContactPage} />,
});

// Admin login route - standalone, not nested under admin layout
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => <SafeComponent component={AdminLogin} />,
});

// Admin root route with layout and error boundary - uses /admin-panel
const adminRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-panel',
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <AdminLayout />
      </Suspense>
    </ErrorBoundary>
  ),
});

// Protected admin routes - all nested under /admin-panel
const adminDashboardRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/dashboard',
  component: () => <SafeComponent component={AdminDashboard} />,
});

const adminProgramsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/programs',
  component: () => <SafeComponent component={AdminPrograms} />,
});

const adminTeamRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/team',
  component: () => <SafeComponent component={AdminTeam} />,
});

const adminImpactStoriesRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/impact-stories',
  component: () => <SafeComponent component={AdminImpactStories} />,
});

const adminEventsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/events',
  component: () => <SafeComponent component={AdminEvents} />,
});

const adminDonationsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/donations',
  component: () => <SafeComponent component={AdminDonations} />,
});

const adminContactsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/contacts',
  component: () => <SafeComponent component={AdminContacts} />,
});

// Control panel root route with error boundary
const controlRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/control',
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <ControlLayout />
      </Suspense>
    </ErrorBoundary>
  ),
});

// Control panel routes
const controlDashboardRoute = createRoute({
  getParentRoute: () => controlRootRoute,
  path: '/',
  component: () => <SafeComponent component={ControlDashboard} />,
});

const controlSiteSettingsRoute = createRoute({
  getParentRoute: () => controlRootRoute,
  path: '/site-settings',
  component: () => <SafeComponent component={ControlSiteSettings} />,
});

const controlProgramsRoute = createRoute({
  getParentRoute: () => controlRootRoute,
  path: '/programs',
  component: () => <SafeComponent component={ControlPrograms} />,
});

const controlEventsRoute = createRoute({
  getParentRoute: () => controlRootRoute,
  path: '/events',
  component: () => <SafeComponent component={ControlEvents} />,
});

const controlGalleryRoute = createRoute({
  getParentRoute: () => controlRootRoute,
  path: '/gallery',
  component: () => <SafeComponent component={ControlGallery} />,
});

const controlTeamRoute = createRoute({
  getParentRoute: () => controlRootRoute,
  path: '/team',
  component: () => <SafeComponent component={ControlTeam} />,
});

const controlImpactRoute = createRoute({
  getParentRoute: () => controlRootRoute,
  path: '/impact',
  component: () => <SafeComponent component={ControlImpact} />,
});

// Build the complete route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  programsRoute,
  eventsRoute,
  galleryRoute,
  donateRoute,
  contactRoute,
  adminLoginRoute,
  adminRootRoute.addChildren([
    adminDashboardRoute,
    adminProgramsRoute,
    adminTeamRoute,
    adminImpactStoriesRoute,
    adminEventsRoute,
    adminDonationsRoute,
    adminContactsRoute,
  ]),
  controlRootRoute.addChildren([
    controlDashboardRoute,
    controlSiteSettingsRoute,
    controlProgramsRoute,
    controlEventsRoute,
    controlGalleryRoute,
    controlTeamRoute,
    controlImpactRoute,
  ]),
]);

// Create router with error handling
let router: ReturnType<typeof createRouter>;

try {
  router = createRouter({ 
    routeTree,
    defaultErrorComponent: () => (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Navigation Error</h2>
          <p className="text-gray-700">We couldn't navigate to this page.</p>
          <Button onClick={() => window.location.href = '/'}>
            <Home className="h-4 w-4 mr-2" />
            Return Home
          </Button>
        </div>
      </div>
    ),
    defaultPendingComponent: LoadingFallback,
  });
} catch (error) {
  console.error('Router initialization error:', error);
  // Fallback router creation
  router = createRouter({ 
    routeTree: rootRoute.addChildren([indexRoute]),
    defaultErrorComponent: () => (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Router Error</h2>
          <p className="text-gray-700">Failed to initialize router.</p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reload
          </Button>
        </div>
      </div>
    ),
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Suspense fallback={<LoadingFallback />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
