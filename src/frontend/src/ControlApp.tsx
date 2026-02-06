import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import StandaloneControlLayout from './components/control/StandaloneControlLayout';
import StandaloneControlDashboard from './pages/control/StandaloneControlDashboard';
import ControlPrograms from './pages/control/ControlPrograms';
import ControlEvents from './pages/control/ControlEvents';
import ControlGallery from './pages/control/ControlGallery';
import ControlTeam from './pages/control/ControlTeam';
import ControlImpact from './pages/control/ControlImpact';
import ControlSiteSettings from './pages/control/ControlSiteSettings';
import { Toaster } from './components/ui/sonner';

const rootRoute = createRootRoute({
  component: StandaloneControlLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: StandaloneControlDashboard,
});

const siteSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/site-settings',
  component: ControlSiteSettings,
});

const programsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/programs',
  component: ControlPrograms,
});

const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/events',
  component: ControlEvents,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gallery',
  component: ControlGallery,
});

const teamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/team',
  component: ControlTeam,
});

const impactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/impact',
  component: ControlImpact,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  siteSettingsRoute,
  programsRoute,
  eventsRoute,
  galleryRoute,
  teamRoute,
  impactRoute,
]);

const router = createRouter({ routeTree });

export default function ControlApp() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
