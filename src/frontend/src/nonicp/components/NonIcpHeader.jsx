import React, { useState, useEffect } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '../auth/useAuth';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Programs', path: '/programs' },
  { name: 'Events', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Donate', path: '/donate' },
  { name: 'Contact', path: '/contact' },
];

const unifiedHoverClasses = "relative overflow-hidden bg-transparent text-gray-900 border border-transparent hover:border-gray-900/30 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all duration-300 group";

export default function NonIcpHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, currentUser, signOut } = useAuth();
  
  let currentPath = '/';
  try {
    const routerState = useRouterState();
    currentPath = routerState?.location?.pathname || '/';
  } catch (error) {
    console.error('Router state error:', error);
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-700 ease-out ${
        isScrolled
          ? 'h-28 bg-gradient-to-r from-primary/95 via-gradient-mid/95 to-gradient-end/95 shadow-glow-lg backdrop-blur-xl border-b border-primary/10'
          : 'h-36 bg-gradient-to-r from-primary/98 via-gradient-mid/98 to-gradient-end/98 shadow-xl'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent/8 via-primary/5 to-secondary/8 gradient-animate opacity-50" />
      
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      <div className="container relative mx-auto flex h-full items-center justify-between px-4 lg:px-8">
        <Link 
          to="/" 
          className="group flex items-center transition-all duration-500 hover:scale-105"
        >
          <div className="relative">
            <img
              src="/assets/a_professional_vector_style_logo_design_Y10xaOEOT32zN1Lvad4GEQ_-removebg-preview.png"
              alt="Shunyatax Global Education Foundation"
              className={`w-auto transition-all duration-700 ease-out ${
                isScrolled ? 'h-24 md:h-28' : 'h-28 md:h-32'
              } drop-shadow-2xl group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]`}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/30 via-primary/30 to-secondary/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-150" />
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-5 py-2.5 rounded-lg ${unifiedHoverClasses}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className={`relative text-sm font-semibold tracking-wide transition-all duration-300 ${
                currentPath === link.path
                  ? 'text-gray-900 drop-shadow-[0_0_8px_rgba(0,0,0,0.15)]'
                  : 'text-gray-900 group-hover:drop-shadow-[0_0_6px_rgba(0,0,0,0.1)]'
              }`}>
                {link.name}
              </span>
              
              {currentPath === link.path && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-10 bg-gradient-to-r from-transparent via-gray-900 to-transparent rounded-full animate-in slide-in-from-bottom-4 shadow-[0_0_12px_rgba(0,0,0,0.2)]" />
              )}
              
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-transparent via-gray-900/50 to-transparent rounded-full group-hover:w-full transition-all duration-400 ease-out" />
            </Link>
          ))}
          
          <Link to="/donate" className="ml-3">
            <Button 
              className={`${unifiedHoverClasses} ${
                isScrolled ? 'text-sm px-5 py-2' : 'text-base px-6 py-2.5'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 font-bold drop-shadow-sm">
                Donate Now
              </span>
            </Button>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`ml-2 ${unifiedHoverClasses}`}
                >
                  <User className="h-4 w-4 mr-2" />
                  <span className="relative z-10">{currentUser?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  <span className="text-sm text-muted-foreground">{currentUser?.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/protected" className="cursor-pointer">
                    Protected Area
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  className={unifiedHoverClasses}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  <span className="relative z-10">Log In</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  className={unifiedHoverClasses}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span className="relative z-10">Sign Up</span>
                </Button>
              </Link>
            </div>
          )}
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/10 to-accent/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
              {isOpen ? (
                <X className="relative h-6 w-6 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="relative h-6 w-6 transition-transform duration-300" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[300px] bg-gradient-to-br from-primary via-gradient-mid to-gradient-end border-l border-primary/10 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-secondary/10 pointer-events-none" />
            
            <div className="relative flex flex-col gap-6 pt-12">
              <div className="flex items-center justify-center pb-4 border-b border-primary-foreground/15">
                <img
                  src="/assets/a_professional_vector_style_logo_design_Y10xaOEOT32zN1Lvad4GEQ_-removebg-preview.png"
                  alt="Shunyatax Global Education Foundation"
                  className="h-24 w-auto drop-shadow-xl"
                />
              </div>
              
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`group relative text-lg font-semibold transition-all duration-500 hover:translate-x-3 ${
                    currentPath === link.path
                      ? 'text-accent-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'
                      : 'text-primary-foreground/90 hover:text-primary-foreground'
                  }`}
                  style={{ 
                    animationDelay: `${index * 80}ms`,
                    animation: 'slide-in-from-right 0.5s ease-out forwards'
                  }}
                >
                  <span className="relative">
                    {link.name}
                    {currentPath === link.path && (
                      <span className="absolute -left-4 top-1/2 -translate-y-1/2 h-2 w-2 bg-accent-foreground rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    )}
                  </span>
                  <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-accent via-accent-foreground to-accent rounded-full group-hover:w-full transition-all duration-400" />
                </Link>
              ))}
              
              <Link 
                to="/donate" 
                onClick={() => setIsOpen(false)}
                className="mt-4"
              >
                <Button 
                  className={`w-full ${unifiedHoverClasses}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 font-bold">
                    Donate Now
                  </span>
                </Button>
              </Link>

              <div className="border-t border-primary-foreground/15 pt-4 mt-2">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="text-sm text-primary-foreground/70 px-2">
                      Signed in as <span className="font-semibold text-primary-foreground">{currentUser?.name}</span>
                    </div>
                    <Link to="/protected" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        Protected Area
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <LogIn className="mr-2 h-4 w-4" />
                        Log In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
