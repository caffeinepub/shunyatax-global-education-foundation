import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import ControlLayout from './components/control/ControlLayout';
import ControlDashboard from './pages/control/ControlDashboard';
import ControlPrograms from './pages/control/ControlPrograms';
import ControlEvents from './pages/control/ControlEvents';
import ControlGallery from './pages/control/ControlGallery';
import ControlTeam from './pages/control/ControlTeam';
import ControlImpact from './pages/control/ControlImpact';
import { Toaster } from './components/ui/sonner';

const rootRoute = createRootRoute({
  component: ControlLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ControlDashboard,
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
