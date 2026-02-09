import { Outlet, useLocation } from '@tanstack/react-router';
import { Component, ErrorInfo, ReactNode, Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import { AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

// Layout-specific error boundary
class LayoutErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Layout Error Boundary: Caught error', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Layout Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-gradient-end/5">
          <div className="text-center space-y-4 max-w-md">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Layout Error</h2>
            <p className="text-gray-700">
              The page layout failed to load. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="text-left bg-gray-50 rounded p-3 mt-4">
                <p className="text-xs font-mono text-gray-700 break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Safe Header Wrapper
function SafeHeader() {
  try {
    return <Header />;
  } catch (error) {
    console.error('Header render error:', error);
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-center">
          <p className="text-sm text-muted-foreground">Header failed to load</p>
        </div>
      </header>
    );
  }
}

// Safe Footer Wrapper
function SafeFooter() {
  try {
    return <Footer />;
  } catch (error) {
    console.error('Footer render error:', error);
    return (
      <footer className="border-t border-border/40 bg-background">
        <div className="container py-4 text-center">
          <p className="text-sm text-muted-foreground">Footer failed to load</p>
        </div>
      </footer>
    );
  }
}

// Safe Outlet Wrapper
function SafeOutlet() {
  try {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin" />
              <p className="text-lg font-semibold text-gray-900">Loading page...</p>
            </div>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    );
  } catch (error) {
    console.error('Outlet render error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Page Error</h2>
          <p className="text-gray-700">This page failed to load.</p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reload Page
          </Button>
        </div>
      </div>
    );
  }
}

export default function Layout() {
  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith('/admin-panel');

  return (
    <LayoutErrorBoundary>
      <div className="flex min-h-screen flex-col">
        {!isAdminPanel && <SafeHeader />}
        <main className="flex-1">
          <SafeOutlet />
        </main>
        <SafeFooter />
      </div>
    </LayoutErrorBoundary>
  );
}
